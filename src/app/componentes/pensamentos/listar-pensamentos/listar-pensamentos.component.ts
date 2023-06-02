import { Component, OnInit } from '@angular/core';
import { Pensamento } from '../pensamento/pensamento';
import { PensamentoService } from '../pensamento.service';

@Component({
  selector: 'app-listar-pensamentos',
  templateUrl: './listar-pensamentos.component.html',
  styleUrls: ['./listar-pensamentos.component.css']
})
export class ListarPensamentosComponent implements OnInit {

  private readonly _pensamentoService:  PensamentoService;

  listaPensamentos: Array<Pensamento> = [];

  constructor(pensamentoService: PensamentoService) { 
    this._pensamentoService = pensamentoService
  }

  ngOnInit(): void {
    this._pensamentoService.listar().subscribe((listaPensamentos) => {
      this.listaPensamentos = listaPensamentos;
    })
  }

}
