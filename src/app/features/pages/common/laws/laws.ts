import { CommonModule, Location } from '@angular/common';
import { Component, OnInit, inject, computed, signal } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { LawResponse } from '../../../../core/types/Law/law';
import { LawService } from '../../../../core/services/laws.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ICONS_LAWS } from '../../../../core/ui/icons/icons.laws';
import { ErrorState } from '../../../../shared/components/error-state/error-state';
import { LoadingState } from '../../../../shared/components/loading-state/loading-state';
import { NavbarLayout } from "../../../../shared/layouts-components/navbar/navbar.layout";
import { FooterLayout } from "../../../../shared/layouts-components/footer/footer.layout";
import { MeshGradient } from '../../../../shared/components/mesh-gradient/mesh-gradient';
import { Pattern } from '../../../../shared/components/pattern/pattern';
import { Button } from './laws-components/buttons/button';
import { Breadcrumb } from "../../../../shared/components/breadcrumb/breadcrumb";
import { GlassCard } from '../../../../shared/components/glass-card/glass-card';
import { LAW_LABELS } from '../../../../core/ui/maps/laws/laws-labels';
import { LAW_NAMES } from '../../../../core/ui/maps/laws/law-names';
import { Badge } from '../../../../shared/components/badge/badge';
import { BadgeIndex } from '../../../../core/ui/types/badge/badge';
@Component({
  selector: 'app-laws',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    LoadingState,
    ErrorState,
    NavbarLayout,
    FooterLayout,
    MeshGradient,
    Pattern,
    GlassCard,
    Button,
    Breadcrumb,
    Badge
],
  templateUrl: './laws.html',
  styleUrl: './laws.css',
})
export class Laws implements OnInit {
  private lawService = inject(LawService);
  private route = inject(ActivatedRoute);
  private sanitizer = inject(DomSanitizer);
  private location = inject(Location); 

  icons = ICONS_LAWS;

  lawContent = signal<LawResponse | undefined>(undefined);
  loading = signal(false);
  error = signal<string | undefined>(undefined);

  displayTitle = computed(() => {
    const slug = this.lawContent()?.slug;
    if (!slug) return '';

    return LAW_NAMES[slug] || slug.replace(/-/g, ' ');
  });

  sanitizedHtml = computed(() => {
    const content = this.lawContent();
    return content 
      ? this.sanitizer.bypassSecurityTrustHtml(content.htmlContent)
      : undefined;
  });

  metadataKeys = computed(() => {
    const content = this.lawContent();
    return content ? Object.keys(content.metadata) : [];
  });

  smallMetadata = computed(() => {
    const keys = ['link_oficial', 'categoria', 'titulo', 'status'];
    return this.metadataKeys().filter(key => keys.includes(key));
  });
  
  largeMetadata = computed(() => {
    const keys = ['agrowerk_match', 'resumo_leigo'];
    return this.metadataKeys().filter(key => keys.includes(key));
  });


  badges = computed<BadgeIndex[]>(() => {
    const title = this.displayTitle();
    
    if (!title) return [];

    return [
      {
        text: title,
        icon: this.icons.SPELL_CHECK
      }
    ];
  });

  ngOnInit() : void {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.loadLawContent(slug);  
    }
  }

  getFriendlyLabel(key: string): string {
    return LAW_LABELS[key] || key.split('_')
                                     .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                                     .join(' ');
  }

  formatValue(value: string, key: string): string {
    if (!value) return '';
  
    const cleanedValue = value.replace(/^"(.*)"$/, '$1');
  
    if (key === 'link_oficial' || cleanedValue.startsWith('http')) {
      return `<a href="${cleanedValue}" target="_blank" class="text-primary hover:text-primary-dark underline decoration-2 underline-offset-4 transition-all flex items-center gap-2">
                Acessar Documento Oficial
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="box-arrow-up-right"></path></svg>
              </a>`;
    }
  
    return cleanedValue;
  }

  loadLawContent(slug: string) {
    this.loading.set(true);
    this.error.set(undefined)
    this.lawService.getLawContent(slug).subscribe({
      next: (response: LawResponse) => {
        this.lawContent.set(response);
        this.loading.set(false);
      },
      error: (error: Error) => {
        this.error.set(error.message);
        this.loading.set(false);
      }
    });
  }

  getMetadataValue(key: string): string {
    const content = this.lawContent();
    return content ? content.metadata[key] : '';
  }

  retry(): void {
    const slug = this.lawContent()?.slug;
    if (slug) {
      this.loadLawContent(slug);  
    }
  }

  hasMetadata = computed(() => this.metadataKeys().length > 0);

  print() {
    window.print(); // Dispara o diálogo do sistema (Imprimir ou Salvar como PDF)
  }
  
  downloadPdf() {
    const originalTitle = document.title;
    const lawTitle = this.lawContent()?.metadata['titulo'] || 'Lei-Agrowerk';
    
    document.title = `AgroWerk - ${lawTitle}`;
    window.print();
    
    setTimeout(() => {
      document.title = originalTitle;
    }, 1000);
  }

  goBack() {
    this.location.back();
  }
}
