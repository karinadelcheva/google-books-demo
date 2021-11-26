export class BaseRepository {
    async getFromApi(queryParam: string): Promise<{}[]| void>{
        return new Promise(()=>{return [{}]});
    }
}