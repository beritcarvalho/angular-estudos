import { Component, OnInit } from '@angular/core';
import { Pensamento } from '../pensamento/pensamento';
import { PensamentoService } from '../pensamento.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-criar-pensamento',
  templateUrl: './criar-pensamento.component.html',
  styleUrls: ['./criar-pensamento.component.css']
})
export class CriarPensamentoComponent implements OnInit {

  private readonly _pensamentoService: PensamentoService;
  private readonly _router: Router;

  public formulario!: FormGroup;

  constructor(pensamentoService: PensamentoService,
    router: Router,
    private formBuilder: FormBuilder) 
   { 
    this._pensamentoService = pensamentoService;
    this._router = router;
  }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      conteudo: ['Formulário reativo'],
      autoria: ['Autoria'],
      modelo: ['1']
    });
  }

  public  salvarPensamento(): void {
    this._pensamentoService.criar(this.formulario.value).subscribe();
    alert('Pensamento salvo com sucesso');    
    this._router.navigate(['/listarPensamentos']);
  }

  public  cancelarPensamento(): void {
    alert('Cancelado');
    this._router.navigate(['/listarPensamentos']);
  }
}
