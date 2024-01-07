export interface IPropChild {
  children: React.ReactNode;
}

export interface IUser {
  id: string,
  tel: string,
  name: string,
  desc: string,
  account: string,
  avatar: string,
  currentOrg?: string,
  refetchHandler?: () => void
}

export interface IPage {
  pageNum: number;
  pageSize: number;
  total: number
}

export interface IMedia {
  id: string;
  url: string;
  remark: string;
}

/**
 * 门店
 */
export interface IOrganization {
  id: string;
  orgFrontImg?: IMedia[];
  orgRoomImg?: IMedia[];
  orgOtherImg?: IMedia[];
  orgName: string;
  logo: string;
  tags?: string;
  description?: string;
  address?: string;
  tel?: string;
  longitude?: string;
  latitude?: string;
  identityCardBackImg: string
  identityCardFrontImg: string
  businessLicense: string
}

export type TBaseOrganization = Partial<IOrganization>;

export type TOrgsQuery = { [key: string]: { __typename?: 'Query', data: IOrganization[], page: IPage } };

export type TOrgQuery = { [key: string]: { __typename?: 'Query', data: IOrganization } };

export interface ICourse {
  name: string; // 课程名称
  desc?: string; //课程描述
  group?: string; //适龄人群
  baseAbility?: string; //适合基础
  limitNumber?: number; //限制上课人数
  duration?: number; //持续时间
  reserveInfo?: string; //预约信息
  refundInfo?: string; //退款信息
  otherInfo?: string; //其它说明信息
}

export type TCoursesQuery = { [key: string]: { __typename?: 'Query', data: ICourse[], page: IPage } };
export type TCourseQuery = { [key: string]: { __typename?: 'Query', data: ICourse } };