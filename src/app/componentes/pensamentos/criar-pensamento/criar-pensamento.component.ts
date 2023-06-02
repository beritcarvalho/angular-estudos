import { Component, OnInit } from '@angular/core';
import { Pensamento } from '../pensamento/pensamento';
import { PensamentoService } from '../pensamento.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-criar-pensamento',
  templateUrl: './criar-pensamento.component.html',
  styleUrls: ['./criar-pensamento.component.css']
})
export class CriarPensamentoComponent implements OnInit {

  private readonly _pensamentoService: PensamentoService;
  private readonly _router: Router;

  public pensamento: Pensamento = {    
    conteudo: '',
    autoria: '',
    modelo: ''
  }

  constructor(pensamentoService: PensamentoService,
    router: Router) { 
    this._pensamentoService = pensamentoService;
    this._router = router;
  }

  ngOnInit(): void {
  }

  public  salvarPensamento(): void {
    this._pensamentoService.criar(this.pensamento).subscribe();
    alert('Pensamento salvo com sucesso');    
    this._router.navigate(['/listarPensamento']);
  }

  public  cancelarPensamento(): void {
    alert('Pensameto cancelado');
    this._router.navigate(['/listarPensamento']);
  }

}
