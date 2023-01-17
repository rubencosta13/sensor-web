import axios from 'axios';
import { ReactNode, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { CSVDownload, CSVLink } from 'react-csv';
import { LinkProps } from 'react-csv/components/Link';
import { cache } from 'pages/_app';
import { addDays } from 'date-fns';

interface FetchData {
  setTemperature: React.Dispatch<React.SetStateAction<null>>;
  setData: React.Dispatch<React.SetStateAction<null>>;
}

const generateCSV = ({ data, setData }: any) => {
  return new Promise<void>((resolve, reject) => {
    setData(data);
    resolve(data);
  });
};

interface GetData {
  startDate: Date;
  endDate: Date;
}

const onChange = async ({
  dates,
  setStartDate,
  setEndDate,
  startDate,
  endDate,
  data,
  setData,
}: any) => {
  const [start, end] = dates;
  setStartDate(start);
  setEndDate(end);
  if (!end) {
    return;
  }
  await getData({ startDate, endDate })
    .then((data) => generateCSV({ data, setData }))
    .catch((err) => console.error(err));
};

const getData = async ({ startDate, endDate }: GetData) => {
  return new Promise<any>(async (resolve, _reject) => {
    if (!cache.get(`${startDate}-${endDate}-data`)) {
      const { data: requestData } = await axios.get(
        `https://h2801469.stratoserver.net/get.php?id=2475238&from=${Math.floor(
          startDate.setHours(0, 0, 0, 1) / 1000,
        )}&to=${
          endDate == null
            ? Math.floor(new Date().getTime() / 1000)
            : Math.floor(endDate.getTime() / 1000)
        }&minimize=true&with_gps=false&with_note=false`,
      );
      cache.set(`${startDate}-${endDate}-data`, requestData);
      resolve(requestData);
      return;
    }
    console.log('> Cache');
    resolve(cache.get(`${startDate}-${endDate}-data`));
  });
};

const headers = [
  { label: 'PM 10', key: 'p1' },
  { label: 'PM 2.5', key: 'p2' },
  { label: 'Temperatura', key: 't' },
  { label: 'Humidadde', key: 'h' },
  { label: 'Pressão', key: 'p' },
  { label: 'Data (Formato Unix)', key: 'time' },
];

const DatePickerElement = () => {
  const [data, setData] = useState<Array<any>>([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());

  return (
    <div>
      <DatePicker
        selected={startDate}
        onChange={(dates) =>
          onChange({
            dates,
            setStartDate,
            setEndDate,
            startDate,
            endDate,
            data,
            setData,
          })
        }
        startDate={startDate}
        endDate={endDate}
        selectsRange
        inline
      />
      {data.length > 0 && (
        <CSVLink
          data={data}
          headers={headers}
          asyncOnClick={true}
          className="btn btn-primary"
          filename={`sensor-espr-values.csv`}
          target="_blank"
        >
          Download Dados
        </CSVLink>
      )}
    </div>
  );
};

export default DatePickerElement;
