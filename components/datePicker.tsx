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
  const responseData = await getData({ startDate, endDate });
  console.log(responseData);
  const resolve = await generateCSV({ data: responseData, setData });
  alert(resolve);
};

const getData = async ({ startDate, endDate }: GetData) => {
  return new Promise<any>(async (resolve, _reject) => {
    if (cache.get(`${startDate}-${endDate}-data`) == undefined) {
      const { data: requestData } = await axios.get(
        `https://h2801469.stratoserver.net/get.php?id=2475238&from=${Math.floor(
          startDate.setHours(0, 0, 0, 1) / 1000,
        )}&to=${
          endDate == null
            ? Math.floor(addDays(startDate, -1).getTime() / 1000)
            : Math.floor(endDate.getTime() / 1000)
        }&minimize=false&with_gps=true&with_note=true`,
      );
      cache.set(`${startDate}-${endDate}-data`, requestData);
      resolve(requestData);
    }
    resolve(cache.get(`${startDate}-${endDate}-data`));
  });
};

const headers = [
  { label: 'PM 10', key: 'p1' },
  { label: 'PM 2.5', key: 'p2' },
  { label: 'Temperatura', key: 't' },
  { label: 'Humidadde', key: 'h' },
  { label: 'Pressão', key: 'p' },
  { label: 'Data', key: 'time' },
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
      {data && (
        <CSVLink
          data={data}
          headers={headers}
          asyncOnClick={true}
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
