import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SeachGIFResponse } from '../interface/gif.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {


  private apiKey:string='cSM1piIms2UUY9tB69dkxDeJy2tGjzcF';
  private servicioUrl:string='https://api.giphy.com/v1/gifs';
  private _historial:string[]=[];

  public resultados:Gif[]=[];
  get historial(){
    // this._historial=this._historial.splice(0,10);
    return [...this._historial]
  }

  constructor( private http:HttpClient){

    this._historial=JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados=JSON.parse(localStorage.getItem('resultados')!) || [];
    // if(localStorage.getItem('historial')){
    //   this._historial=JSON.parse(localStorage.getItem('historial')!);
    // }

  }

  buscarGifs(querry:string){
    
    querry=querry.trim().toLocaleLowerCase();

    if(!this._historial.includes(querry)){
      this._historial.unshift(querry);
      this._historial=this._historial.splice(0,10);

      localStorage.setItem('historial',JSON.stringify( this._historial));


    }

    const params=new HttpParams()
      .set('api_key',this.apiKey)
      .set('limit','10')
      .set('q',querry);

    //this.http.get<SeachGIFResponse>(`https://api.giphy.com/v1/gifs/search?api_key=cSM1piIms2UUY9tB69dkxDeJy2tGjzcF&q=${querry}&limit=10`)
    this.http.get<SeachGIFResponse>(`${this.servicioUrl}/search`,{params})
    .subscribe((resp)=>{
      //console.log(resp.data);
      this.resultados=resp.data;
      localStorage.setItem('resultados',JSON.stringify( this.resultados));
    });
    
  }


}
