import { MensagensErros } from './../../../interfaces/erros-mensagens';
import { Component, OnInit } from '@angular/core';
import { Pensamento } from '../pensamento/pensamento';
import { PensamentoService } from '../pensamento.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    private formBuilder: FormBuilder) {
    this._pensamentoService = pensamentoService;
    this._router = router;
  }

  mensagensErros: MensagensErros = {
    conteudo: '',
    autoria: ''
  };




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
  }

  public salvarPensamento(): void {
    const tipoErroConteudo: any = this.formulario.get('conteudo')?.errors;
    const tipoErroAutoria: any = this.formulario.get('autoria')?.errors;

    if (this.formulario.valid) {
      this._pensamentoService.criar(this.formulario.value).subscribe();
      alert('Pensamento salvo com sucesso');
      this._router.navigate(['/listarPensamentos']);
    } else {
      this.obterTipoErro(tipoErroConteudo, tipoErroAutoria);
    }
  }

  private obterTipoErro(tipoErroConteudo: any, tipoErroAutoria: any) {
    if (tipoErroConteudo) {
      if (tipoErroConteudo['required']) {
        this.mensagensErros.conteudo = 'O conteudo é obrigatório';
      } else if (tipoErroConteudo['minlength'])
        this.mensagensErros.conteudo = 'O conteudo deve conter no minimo 3 caracteres';
      else if (tipoErroConteudo['pattern'])
        this.mensagensErros.conteudo = 'O conteudo não pode ser apenas espaços em branco';
    }

    if (tipoErroAutoria) {
      if (tipoErroAutoria['required'])
        this.mensagensErros.autoria = 'O autoria é obrigatória';
      else if (tipoErroAutoria['minlength'])
        this.mensagensErros.autoria = 'O autoria deve conter no minimo 3 caracteres';
      else if (tipoErroAutoria['pattern'])
        this.mensagensErros.autoria = 'O autoria não pode ser apenas espaços em branco';
    }
  }

  public cancelarPensamento(): void {
    alert('Cancelado');
    this._router.navigate(['/listarPensamentos']);
  }

  habilitarBotao(): string {
    if(this.formulario.valid)
      return 'botao';
    return 'botao_desabilitado'  
  }
}
