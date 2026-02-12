import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title } from "../../../../../shared/components/title/title";
import { Subtitle } from "../../../../../shared/components/subtitle/subtitle";
import { Carousel } from '../../../../../shared/components/carousel/carousel';
import { Testimonial } from '../../../../../core/ui/types/testimonial/testimonial';
import { ICONS_TESTIMONIALS } from '../../../../../core/ui/icons/icons.testimonials';
import { TestimonialCard } from './testimonials-components/testimonial-card/testimonial-card';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [
    CommonModule,
     Title, 
     Subtitle, 
     Carousel,
    TestimonialCard],
  templateUrl: './testimonials.html',
  styleUrl: './testimonials.css',
})
export class Testimonials {

  icons = ICONS_TESTIMONIALS;

  testimonials: Testimonial[] = [
    {
      id: 1,
      quote: 'O AgroWerk transformou completamente a gestão da minha fazenda. Economizei R$ 45 mil em apenas 6 meses com o marketplace barter. Nunca imaginei que seria tão fácil negociar diretamente com fornecedores!',
      author: {
        name: 'João Silva',
        role: 'Produtor Rural',
        property: 'Fazenda Boa Vista',
        location: 'Goiás, GO',
        avatar: 'assets/images/agricultor1.jpg'
      },
      metrics: {
        productivity: '+40%',
        savings: 'R$ 45.000'
      },
      rating: 5
    },
    {
      id: 2,
      quote: 'Como fornecedora, o AgroWerk me deu acesso direto a centenas de produtores. Minhas vendas aumentaram 60% e consigo oferecer preços melhores sem intermediários. É uma revolução no agronegócio!',
      author: {
        name: 'Maria Santos',
        role: 'Fornecedora de Insumos',
        property: 'AgroChem Distribuidora',
        location: 'Mato Grosso, MT',
        avatar: 'assets/images/agricultor1.jpg'
      },
      metrics: {
        customMetric: {
          label: 'Aumento em vendas',
          value: '+60%'
        },
        savings: 'R$ 120.000'
      },
      rating: 5
    },
    {
      id: 3,
      quote: 'A previsão de colheita com o AgroWerk é impressionante. Consegui planejar melhor meu estoque de insumos e reduzir desperdício em 35%. O sistema paga por si só!',
      author: {
        name: 'Carlos Oliveira',
        role: 'Produtor Rural',
        property: 'Fazenda Esperança',
        location: 'Paraná, PR',
        avatar: 'assets/images/agricultor1.jpg'
      },
      metrics: {
        productivity: '+35%',
        customMetric: {
          label: 'Redução desperdício',
          value: '35%'
        }
      },
      rating: 5
    }
  ];
}
