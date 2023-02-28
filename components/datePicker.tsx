import axios from 'axios';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { CSVLink } from 'react-csv';
import { cache } from 'pages/_app';

type GenerateCV = {
  data: object[];
  setData: (data: object[]) => void;
};


interface GetData {
  startDate: Date | null;
  endDate: Date | null;
}

const generateCSV = ({ data, setData }: GenerateCV) => {
  return new Promise((resolve, reject) => {
    try {
      setData(data);
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

const onChange = async ({
  dates,
  setStartDate,
  setEndDate,
  startDate,
  endDate,
  setData,
}: // eslint-disable-next-line @typescript-eslint/no-explicit-any
any) => {
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
  return new Promise<object[]>((resolve, reject) => {
    if (!startDate) {
      reject('No starting date was provided');
      return;
    }
    const cacheKey = `${startDate}-${endDate}-data`;
    if (cache.get(cacheKey)) {
      console.log('> Cache');
      resolve(cache.get(cacheKey));
    } else {
      axios
        .get(
          `https://h2801469.stratoserver.net/get.php?id=2475238&from=${Math.floor(
            startDate.setHours(0, 0, 0, 1) / 1000,
          )}&to=${
            endDate == null
              ? Math.floor(new Date().getTime() / 1000)
              : Math.floor(endDate.getTime() / 1000)
          }&minimize=true&with_gps=false&with_note=false`,
        )
        .then(({ data: requestData }) => {
          cache.set(cacheKey, requestData);
          console.log(cache.get(cacheKey));
          resolve(requestData);
        })
        .catch(reject);
    }
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
  const [data, setData] = useState<Array<object>>([]);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

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
          filename={'sensor-espr-values.csv'}
          target="_blank"
        >
          Download Dados
        </CSVLink>
      )}
    </div>
  );
};

export default DatePickerElement;
