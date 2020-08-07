export class ItemwiseRejDetail {
  id: number;
  pstngdate: string;
  plant: number;
  insplot: number;
  // tslint:disable-next-line: variable-name
  item_type: string;
  itemcode: string;
  itemname: string;
  // tslint:disable-next-line: variable-name
  inspection_qty: number;
  // tslint:disable-next-line: variable-name
  inspection_value: number;
  // tslint:disable-next-line: variable-name
  reject_qty: number;
  rejper: number;
  // tslint:disable-next-line: variable-name
  reject_value: number;
  okvalue: number;
  okqty: number;
  mouldingqty: number;
  mouldingper: number;
  platingper: number;
  platingqty: number;

  moulding_value: number;
  plating_value: number;

  buffingvalue: number;
  buffingqty: number;
  holdvalue: number;
  holdqty: number;

  othersqty: number;
  others_value: number;
}
