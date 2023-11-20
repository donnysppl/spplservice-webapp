export interface SignUp {
    name: string;
    email: string;
    mobile: string;
    password: string;
    code: string;
}
export interface userTokenData {
    name: string;
    email: string;
    id: string;
    exp: Number;
    iat: Number;
}
export interface RequestList {
    _id: string
    firstname: string
    lastname: string
    mobile: string
    altmobile: string
    email: string
    address: string
    city: string
    state: string
    pincode: string
    brand: string
    productType: string
    productname: string
    complaint_type: string
    warranty: string
    purchaseMode: string
    purchase_date: string
    set_serialno: string
    query: string
    invoice: Invoice[]
    issue_image: IssueImage[]
    under_warranty: UnderWarranty[]
    userId: string
    status: string
    payment_details: any[]
    createdAt: string
    updatedAt: string
    request_id?: string
    __v: number
}

export interface Invoice {
    fieldname: string
    originalname: string
    encoding: string
    mimetype: string
    destination: string
    filename: string
    path: string
    size: number
}

export interface IssueImage {
    fieldname: string
    originalname: string
    encoding: string
    mimetype: string
    destination: string
    filename: string
    path: string
    size: number
}

export interface UnderWarranty {
    fieldname: string
    originalname: string
    encoding: string
    mimetype: string
    destination: string
    filename: string
    path: string
    size: number
}
