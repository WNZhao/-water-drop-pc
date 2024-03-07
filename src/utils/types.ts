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
  orgId?: string,
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

export interface OrderTimeType {
  startTime: string;
  endTime: string;
  key: number;
}

export interface ReducibleTimeType {
  week: string;
  orderTime: OrderTimeType[];
}


export interface ICourse {
  id?: string; // 课程id
  name: string; // 课程名称
  desc?: string; //课程描述
  group?: string; //适龄人群
  baseAbility?: string; //适合基础
  limitNumber?: number; //限制上课人数
  duration?: number; //持续时间
  reserveInfo?: string; //预约信息
  refundInfo?: string; //退款信息
  otherInfo?: string; //其它说明信息
  reducibleTime?: ReducibleTimeType[]; //其它说明信息
}

export type TBaseCourse = Partial<ICourse>;
export type TCoursesQuery = { [key: string]: { __typename?: 'Query', data: ICourse[], page: IPage } };
export type TCourseQuery = { [key: string]: { __typename?: 'Query', data: ICourse } };


// ===================部门树相关接口====================================
export interface PageInput {
  pageNum: number;
  pageSize?: number;
  total?: number;
}
export interface DepartmentsTree {
  id: string;
  name: string;
  description: string;
  depth: number;
  key?: string;
  label?: string;
  parentId?: string;
  isLeaf?: boolean;
  relateBizIds?: string;
  sort?: number;
  children?: DepartmentsTree[];
}

export interface IDepartments {
  id?: string; //部门ID
  name: string; //部门名称
  path?: string; //路径
  depth?: number; //深度
  description: string; //部门描述
  parentId: string; //父ID
  biz_id: string; //业务ID
  isLeaf: boolean; //是否是叶子节点
  relateBizIds: string; //关联业务ID
  sort?: number;
}

export type TBaseDepartments = Partial<IDepartments>;
export type TDepartmentssQuery = { [key: string]: { __typename?: 'Query', data: IDepartments[], page: IPage, code?: number } };
export type TDepartmentsQuery = { [key: string]: { __typename?: 'Query', data: IDepartments, code?: number } };