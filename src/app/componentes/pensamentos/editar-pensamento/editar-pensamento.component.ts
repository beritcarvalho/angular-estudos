import { ActivatedRoute, Router } from '@angular/router';
import { PensamentoService } from '../pensamento.service';
import { Pensamento } from './../pensamento/pensamento';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  public formulario!: FormGroup;

  constructor(
    pensamentoService: PensamentoService,
    router: Router,
    route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { 
    this._pensamentoService = pensamentoService;
    this._router = router;
    this._route = route;
  }

  ngOnInit(): void {

    this.formulario = this.formBuilder.group({
      conteudo: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(/(.|\s)*\S(.|\s)*/)
      ])],
      autoria: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(/(.|\s)*\S(.|\s)*/)
      ])],
      modelo: ['modelo1', [Validators.required]],
    });

    
    const id = parseInt(this._route.snapshot.paramMap.get('id')!);
    this._pensamentoService.obterPorId(id).subscribe((pensamento) => {
    this.formulario.value.conteudo = pensamento.conteudo,
    this.formulario.value.autoria = pensamento.autoria,
    this.formulario.value.modelo = pensamento.modelo
  })    
  }

  public salvarPensamento(): void {
    this._pensamentoService.editar(this.formulario.value).subscribe();
    alert('Atualizado com sucesso!');
    this._router.navigate(['/listarPensamentos']);
  }

  public cancelarPensamento(): void {
    this._router.navigate(['/listarPensamentos']);
  }

}
