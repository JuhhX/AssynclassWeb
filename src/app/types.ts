interface student{
    studentName: string,
    studentID: number,
    ra: string,
    avatarURL: string,
    teacherID: number[],
    studentGrade: SeriesAlunos,
    birthday: string,
    contact: string,
    points: number
}

interface Teacher{
    teacherName: string,
    teacherID: number,
    avatarURL: string,
    subjects: MateriasProf[]
    grades: SeriesAlunos[],
    isMentor: boolean,
    cpf: string,
    inst: string[],
    points: number
}

interface Institution{
    instituitionID: number,
    instituitionName: string,
    avatarURL: string,
    cnpj: string,
    email: string,
    contact: string,
    points: number
}

interface Coupons{
    couponID: string
    couponName: string
    couponDescription: string
    couponValue: number
    byCompany: string
    standOut: boolean
    endsIn: string,
    couponCode: string[]
}

interface Plan{
    cuponsAvailable: number
    planValue: number
    startedIn: string
    endsIn: string
    planType: PlanTypes
    visibility: boolean
}

interface Company{
    companyID: string
    companyName: string
    cnpj: string
    coupons: Coupons[]
    plan: Plan
}

interface studentsGroups{
    teacherID: number,
    studentID: (number | undefined)[],
    groupID: number,
    groupName: string,
    groupDescription: string,
    groupAvatar: string,
}

interface RequestMentor{
    requestID: number,
    teacherID: string,
    studentID: string
}

interface Chat{
    idChat: string,
    firstUser: string,
    secondUser: string,
    messages: string[]
}

interface Content{
    contentID: number,
    contentName: string,
    contentDescription: string,
    teacherID: string,
    content: string,
    toStudent: number[]
}

interface GameContent{
    gameID: string,
    gameName: string,
    gameDescription: string,
    teacherID: string,
    gameContent: string,
    toStudent: number[]
}

enum PlanTypes{
    MONTHLY_NORMAL,
    YEARLY_NORMAL,
    MONTHLY_PLUS,
    YEARLY_PLUS,
    CUSTOM,
    VOID,
}

enum MateriasProf{
    MATEMATICA,
    PORTUGUES,
    CIENCIAS,
    INGLES,
    GEOGRAFIA,
    HISTORIA
}

enum SeriesAlunos{
    ANO_6,
    ANO_7,
    ANO_8,
    ANO_9,
    ANO_1,
    ANO_2,
    ANO_3,
}