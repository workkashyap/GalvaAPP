export class DailyReportSummary {
    id: number;
    fromdate?: string;
    todate?: string;
    plant: string;
    itemtype: string;
    produceqty: number;
    producevalue: number;
    okqty?: number;
    okvalue: number;
    okper: number;
    rejectqty: number;
    rejper?: number;
    rejectvalue: number;
  }
  