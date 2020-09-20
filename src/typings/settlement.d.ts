
interface Ilist {
  settlementId?: string;
  tenantId?: number;
  merchantId?: string;
  merchantType?: number;
  merchantCode?: string;
  merchantName?: string;
  settlementTime?: string;
  collateTime?: string;
  status?: number; // 状态
  noteInfor?: string;
  cityCode?: string;
  settlePrice?: number;
  accountDate?: string;
}

export interface ISettlementList {
  total: number;
  list: Ilist[];
  loading?: boolean;
}
