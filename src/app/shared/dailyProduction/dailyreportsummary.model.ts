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
    inspection_value:number;
    inspection_qty:number;
    holdvalue:number;
    holdqty:number;
    buffingvalue:number;
    buffingqty:number;
    platingvalue:number;
    platingper:number;
    mouldingvalue:number;
    mouldingper:number;
    jigingvalue:number;
    jigingper:number;
    othervalue:number;
    otherper:number;
  }
  