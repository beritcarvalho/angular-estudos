import { Component, OnInit } from '@angular/core';
import { Pensamento } from '../pensamento/pensamento';

@Component({
  selector: 'app-criar-pensamento',
  templateUrl: './criar-pensamento.component.html',
  styleUrls: ['./criar-pensamento.component.css']
})
export class CriarPensamentoComponent implements OnInit {

  public pensamento: Pensamento = {
    id: 0,
    conteudo: '',
    autoria: '',
    modelo: ''
  }

  constructor() { }

  ngOnInit(): void {
  }

  public  salvarPensamento(): void {
    alert('Pensameto salvo')
  }

  public  cancelarPensamento(): void {
    alert('Pensameto cancelado')
  }

}
