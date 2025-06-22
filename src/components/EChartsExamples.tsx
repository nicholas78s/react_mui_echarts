import { useState } from "react";
import { ReactECharts } from "./ReactECharts";
import type { EChartsOption } from "echarts";
import MenuItem from '@mui/material/MenuItem';
import Select, { type SelectChangeEvent } from '@mui/material/Select';

interface IDataItemType {
  name: string;
  values: { 
    value: number, 
    name: string 
  } [];
}

interface IGetOptionFunctionType {
  ( chartData: IDataItemType | undefined ): EChartsOption;
}

function EChartsExamples() {

  const data: IDataItemType[] = [
    {
      name: 'Referer of a Website',
      values: [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' }
      ],
    },
    {
      name: 'Weather Statistics',
      values: [
        { value: 215, name: 'CityF' },
        { value: 600, name: 'CityE' },
        { value: 735, name: 'CityD' },
        { value: 510, name: 'CityC' },
        { value: 434, name: 'CityB' },
        { value: 335, name: 'CityA' },
      ],
    },
  ];

  const [chartType, setChartType] = useState<string | null>(data[0].name);
  
  const getOption: IGetOptionFunctionType = ( chartData: IDataItemType | undefined ) => {

    return {
      title: {
        text: chartData?.name,
        left: 'center',
        show: false,
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        bottom: 0,
        left: 'center',
      },
      series: [
        {
          type: 'pie',
          name: "seriesName",
          center: ['50%', '50%'],
          radius: '70%',
          top: 0,
          bottom: 0,
          data: chartData?.values || [],
        }
      ]
    };
  }

  const handleChartTypeChange = (event: SelectChangeEvent) => {
    setChartType(event.target.value as string);
  };

  return (
    <>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={chartType? chartType : undefined}
        // label="Age"
        onChange={handleChartTypeChange}
      >
        {data.map(item => <MenuItem value={item.name}>{item.name}</MenuItem>)}
      </Select>
      <ReactECharts option={getOption( data.find(item => item.name == chartType) )} style={{width: "500px", height: "300px"}}/>
    </>
  )
}

export default EChartsExamples

