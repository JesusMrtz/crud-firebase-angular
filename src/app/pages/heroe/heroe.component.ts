import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { HeroeModel } from '../../models/heroe.model';
import { HeroesService } from '../../services/heroes.service';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe: any = new HeroeModel();

  constructor(private heroesService: HeroesService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if ( id !== 'nuevo') {
      this.heroesService.getHeroe(id)
      .subscribe(resp => {
        console.log(resp);
        resp[`id`] = id;
        this.heroe = resp;
      });
    }
  }

  guardar(form: NgForm) {
    if (form.invalid) {
      return;
    }

    Swal.fire({
      title: 'Espere',
      text: 'Guardando información',
      type: 'info',
      allowOutsideClick: false
    });

    Swal.showLoading();

    let peticion: Observable<any>;

    if (this.heroe.id) {
      peticion = this.heroesService.actualizarHeroe(this.heroe);
    } else {
      peticion = this.heroesService.crearHeroe(this.heroe);
    }

    peticion.subscribe(resp => {
      Swal.fire({
        title: this.heroe.nombre,
        text: 'Se ha guardado la información',
        type: 'success'
      });
    }, () => {}, () => {
      this.router.navigate(['/heroe', this.heroe.id]);
    });
  }

}
