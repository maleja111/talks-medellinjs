export class Talk {
    constructor(
        public firstName = '',
        public lastName = '',
        public email = '',
        public twitterUser = '',
        public titleTalk = '',
        public duration = '',
        public shirtSize = '',
        public talkDescription = '',
        public speakerDescription = '',
        public necessaryResources = '',
    ) { }
}

export interface ITalk {
    firstName: string;
    lastName: string;
    email: string;
    twitterUser: string;
    titleTalk: string;
    duration: string;
    shirtSize: string;
    talkDescription: string;
    speakerDescription: string;
    necessaryResources: string;
}
