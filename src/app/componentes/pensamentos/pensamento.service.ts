import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Pensamento } from './pensamento/pensamento';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PensamentoService {

  private readonly _url = 'http://localhost:3000/pensamentos'

  private _http: HttpClient;

  constructor(http: HttpClient) {
    this._http = http;
  }

  public listar(): Observable<Array<Pensamento>> {
    const listaPensamentos = this._http.get<Array<Pensamento>>(this._url);
    return listaPensamentos;
  }

  public criar(pensamento: Pensamento): Observable<Pensamento> {
    return this._http.post<Pensamento>(this._url, pensamento);
  }

  public excluir(id: number): Observable<Pensamento> {
    const urlPensamento = `${this._url}/${id}`;
    return this._http.delete<Pensamento>(urlPensamento);
  }

  public editar(pensamento: Pensamento): Observable<Pensamento> {
    const urlPensamento = `${this._url}/${pensamento.id}`;
    return this._http.put<Pensamento>(urlPensamento, pensamento);
  }

  public obterPorId(id: number): Observable<Pensamento> {
    const urlPensamento = `${this._url}/${id}`;
    return this._http.get<Pensamento>(urlPensamento);
  }
}