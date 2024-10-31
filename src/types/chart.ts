import { ChartData, ChartOptions } from 'chart.js';

export type LineChartData = ChartData<'line'>;
export type LineChartOptions = ChartOptions<'line'>;

export interface EmailAnalyticsData {
  processed: number[];
  assisted: number[];
  labels: string[];
}