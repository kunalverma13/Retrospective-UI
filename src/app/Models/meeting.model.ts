export class Meeting {
    constructor(
        public id: string, 
        public meetingName: string, 
        public participants: Participant[], 
        public pointsLists?: Points[]) {
    }
}

export class Participant {
    constructor(public id: number, public participantName: string, public participantEmail: string) {
    }
}

export class Points {
    constructor(public id: number, public listName: string, public points: Point[]) {
    }
}

export class Point {
    constructor(public id: number, public participantName: string, public participantId: number, public pointText: string, public actionItem: string) {
    }
}