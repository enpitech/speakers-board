export default class SpeakerController {
    private speakers: { id: number; name: string; topic: string }[] = [];
    private currentId: number = 1;

    public getAllSpeakers(req: any, res: any): void {
        res.json(this.speakers);
    }

    public getSpeakerById(req: any, res: any): void {
        const speaker = this.speakers.find(s => s.id === parseInt(req.params.id));
        if (speaker) {
            res.json(speaker);
        } else {
            res.status(404).send('Speaker not found');
        }
    }

    public createSpeaker(req: any, res: any): void {
        const newSpeaker = { id: this.currentId++, ...req.body };
        this.speakers.push(newSpeaker);
        res.status(201).json(newSpeaker);
    }

    public updateSpeaker(req: any, res: any): void {
        const index = this.speakers.findIndex(s => s.id === parseInt(req.params.id));
        if (index !== -1) {
            this.speakers[index] = { id: this.speakers[index].id, ...req.body };
            res.json(this.speakers[index]);
        } else {
            res.status(404).send('Speaker not found');
        }
    }

    public deleteSpeaker(req: any, res: any): void {
        const index = this.speakers.findIndex(s => s.id === parseInt(req.params.id));
        if (index !== -1) {
            this.speakers.splice(index, 1);
            res.status(204).send();
        } else {
            res.status(404).send('Speaker not found');
        }
    }
}