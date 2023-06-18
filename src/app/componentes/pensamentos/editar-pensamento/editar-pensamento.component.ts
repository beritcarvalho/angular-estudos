import { ActivatedRoute, Router } from '@angular/router';
import { PensamentoService } from '../pensamento.service';
import { Pensamento } from './../pensamento/pensamento';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editar-pensamento',
  templateUrl: './editar-pensamento.component.html',
  styleUrls: ['./editar-pensamento.component.css']
})
export class EditarPensamentoComponent implements OnInit {

  private readonly _pensamentoService: PensamentoService;
  private readonly _router: Router;
  private readonly _route: ActivatedRoute;

  public pensamento: Pensamento = {    
    conteudo: '',
    autoria: '',
    modelo: ''
  }

  constructor(
    pensamentoService: PensamentoService,
    router: Router,
    route: ActivatedRoute
  ) { 
    this._pensamentoService = pensamentoService;
    this._router = router;
    this._route = route;
  }

  ngOnInit(): void {
    const id = parseInt(this._route.snapshot.paramMap.get('id')!);
    this._pensamentoService.obterPorId(id).subscribe((pensamento) => 
    this.pensamento = pensamento)    
  }

  public salvarPensamento(): void {
    this._pensamentoService.editar(this.pensamento).subscribe();
    alert('Atualizado com sucesso!');
    this._router.navigate(['/listarPensamentos']);
  }

  public cancelarPensamento(): void {
    this._router.navigate(['/listarPensamentos']);
  }

}
