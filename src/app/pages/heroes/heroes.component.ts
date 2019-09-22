import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { HeroeModel } from '../../models/heroe.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: HeroeModel[] = [];
  cargando = true;
  error = false;

  constructor(private heroesService: HeroesService) { }

  ngOnInit() {
    this.heroesService.getHeroes()
    .subscribe(resp => {
      this.heroes = resp;
      this.cargando = false;
    }, () => {
      this.error = true;
    });
  }

  borrarHeroe(heroe: HeroeModel, index: number) {
    Swal.fire({
      title: 'Borrando registro',
      text: `¿Esta seguro que desea borrar a ${heroe.nombre}`,
      type: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(resp => {
      if (resp.value) {
        this.heroesService.borrarHeroe(heroe.id)
        .subscribe( () => {
          this.heroes.splice(index, 1);
        });
      }
    });
  }

}
