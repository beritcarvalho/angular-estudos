import { Component, OnInit } from "@angular/core";
import { PensamentoService } from "../pensamento.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Pensamento } from "../pensamento/pensamento";

@Component({
  selector: 'app-excluir-pensamento',
  templateUrl: './excluir-pensamento.component.html',
  styleUrls: ['./excluir-pensamento.component.css']
})
export class ExcluirPensamentoComponent implements OnInit {

  private readonly _pensamentoService: PensamentoService;
  private readonly _router: Router;
  private readonly _route: ActivatedRoute;    

  public pensamento: Pensamento = {    
    conteudo: '',
    autoria: '',
    modelo: ''
  }

  constructor(pensamentoService: PensamentoService,
    router: Router,
    route: ActivatedRoute) {
      this._pensamentoService = pensamentoService;
      this._router = router;
      this._route = route;
     }

  ngOnInit(): void {
    const id = parseInt(this._route.snapshot.paramMap.get('id')!);
    this._pensamentoService.obterPorId(id).subscribe((pensamento) => {
      this.pensamento = pensamento
    })
  }

  public excluirPensamento(): void {
    if(this.pensamento.id) {
      this._pensamentoService.excluir(this.pensamento.id).subscribe();
    }

    this._router.navigate(['/listarPensamento']);
  }

  public cancelar(): void {
    this._router.navigate(['/listarPensamento']);
  }
  
}
