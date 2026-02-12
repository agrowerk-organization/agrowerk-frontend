# 🌾 AgroWerk - Frontend

> Interface moderna e responsiva para gestão de inventário agrícola desenvolvida com Angular

[![Angular](https://img.shields.io/badge/Angular-21-DD0031?style=for-the-badge&logo=angular&logoColor=white)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
[![License](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)

## 📋 Sobre o Projeto
**AgroWerk Frontend** é uma aplicação web moderna que oferece interface intuitiva para o sistema integrado de gestão empresarial para agricultura em diferentes escalas de produção, fornecendo funcionalidades de gestão e planejamento de safras, adequações de inventários conforme safras e interações em barter agrícola, permitindo a conexão entre produtores rurais, fornecedores e administradores através de dashboards personalizados e funcionalidades específicas para cada perfil.

### ✨ Principais Funcionalidades
- 🔐 **Sistema de Autenticação** com JWT, HTTP only cookies e guards de rota
- 📊 **Dashboards Personalizados** para cada tipo de usuário
- 🌾 **Gestão de Propriedades Rurais** - interface completa para cadastro e administração
- 🌱 **Planejamento de Safras** - cronograma e gestão completa do ciclo produtivo
- 📅 **Gestão de Safras** - acompanhamento de plantio, desenvolvimento e colheita
- 🤝 **Operações de Barter Agrícola** - negociação e gestão de trocas insumo-produto
- 🎯 **Controle de Lotes (Batches)** - rastreabilidade e gestão de qualidade
- 📦 **Controle de Estoque** - visualização em tempo real e movimentações
- 🔄 **Gestão de Movimentações** - histórico completo de entrada/saída de insumos
- 🏭 **Portal de Fornecedores** - gestão de insumos e especialidades
- 🏷️ **Categorização de Insumos** - organização por tipo e aplicação
- 👥 **Gestão Multi-tenant** - isolamento de dados por organização
- 🎨 **Design Responsivo** - funciona perfeitamente em desktop, tablet e mobile
- ⚡ **Performance Otimizada** - lazy loading e estratégias de cache
- 🔄 **Interceptors HTTP** - tratamento centralizado de requisições e refresh automático
- 🎯 **Type Safety** - tipagem forte com TypeScript

## 🚀 Tecnologias Utilizadas

### Core
- **Angular 21** - Framework principal
- **TypeScript 5.x** - Linguagem de programação
- **Signals** - Programação reativa
- **Angular Router** - Gerenciamento de rotas

### Estilização
- **Tailwind CSS** - Framework CSS

### Ferramentas & Build
- **Angular CLI** - Ferramentas de desenvolvimento
- **Webpack** - Module bundler (via Angular CLI)
- **ESLint** - Linting de código

### Segurança
- **Auth Guards** - Proteção de rotas
- **HTTP Interceptors** - Injeção de tokens e tratamento de erros
- **Environment Variables** - Gestão de configurações

## 📦 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- Node.js 18+ e npm 9+
- Angular CLI 17+
- Git

## ⚙️ Instalação e Configuração

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/agrowerk-frontend.git
cd agrowerk-frontend
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Edite o arquivo `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api',
  apiTimeout: 30000,
  tokenKey: 'agrowerk_token',
  refreshTokenKey: 'agrowerk_refresh_token'
};
```

Para produção, edite `src/environments/environment.prod.ts`:

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://api.agrowerk.com/api',
  apiTimeout: 30000,
  tokenKey: 'agrowerk_token',
  refreshTokenKey: 'agrowerk_refresh_token'
};
```

### 4. Execute o projeto

```bash
npm start
# ou
ng serve
```
Ou caso prefira no Docker: 

```docker
docker compose up --build
```

A aplicação estará disponível em: `http://localhost:4200`

### 5. Build para produção

```bash
npm run build
# ou
ng build --configuration production
```

## 🏗️ Arquitetura do Projeto

```
src/
├── app/
│   ├── core/                          # Funcionalidades core do app
│   │   ├── services/                  # Serviços singleton
│   │   │   ├── auth.service.ts        # Autenticação
│   │   │   ├── api.service.ts         # Cliente HTTP base
│   │   │   ├── storage.service.ts     # LocalStorage wrapper
│   │   │   └── toast.service.ts       # Notificações
│   │   ├── guards/                    # Guards de rota
│   │   │   ├── auth.guard.ts          # Proteção de rotas autenticadas
│   │   │   └── role.guard.ts          # Proteção por role
│   │   ├── interceptors/              # HTTP Interceptors
│   │   │   ├── auth.interceptor.ts    # Injeção de token
│   │   │   ├── error.interceptor.ts   # Tratamento de erros
│   │   │   └── loading.interceptor.ts # Loading global
│   │   ├── types/                     # Tipos e interfaces
│   │   │   ├── user.types.ts          # Tipos de usuário
│   │   │   ├── stock.types.ts         # Tipos de estoque
│   │   │   └── api-response.types.ts  # Respostas da API
│   │   └── ui/                        # Componentes UI core
│   │       ├── loading/               # Spinner de carregamento
│   │       └── toast/                 # Componente de notificação
│   ├── features/                      # Features/Páginas da aplicação
│   │   ├── auth/                      # Módulo de autenticação
│   │   │   ├── login/                 # Página de login
│   │   │   └── register/              # Página de registro
│   │   ├── dashboard/                 # Dashboard principal
│   │   ├── properties/                # Gestão de propriedades
│   │   ├── inventory/                 # Gestão de inventário
│   │   ├── stock/                     # Controle de estoque
│   │   ├── suppliers/                 # Gestão de fornecedores
│   │   ├── batches/                   # Gestão de lotes
│   │   └── profile/                   # Perfil do usuário
│   ├── shared/                        # Componentes compartilhados
│   │   ├── components/                # Componentes reutilizáveis
│   │   │   ├── header/                # Cabeçalho
│   │   │   ├── sidebar/               # Menu lateral
│   │   │   ├── footer/                # Rodapé
│   │   │   ├── card/                  # Card genérico
│   │   │   ├── table/                 # Tabela customizada
│   │   │   ├── modal/                 # Modal genérico
│   │   │   └── form-field/            # Campo de formulário
│   │   ├── sections/                  # Seções complexas reutilizáveis
│   │   │   ├── user-card/             # Card de usuário
│   │   │   ├── stock-summary/         # Resumo de estoque
│   │   │   └── batch-info/            # Informações de lote
│   │   └── pipes/                     # Pipes customizados
│   │       ├── date-format.pipe.ts    # Formatação de data
│   │       ├── currency-br.pipe.ts    # Moeda brasileira
│   │       └── user-role.pipe.ts      # Tradução de roles
│   ├── app.component.ts               # Componente raiz
│   ├── app.routes.ts                  # Configuração de rotas
│   └── app.config.ts                  # Configuração da aplicação
├── assets/                            # Arquivos estáticos
│   ├── images/                        # Imagens
│   ├── icons/                         # Ícones
│   └── fonts/                         # Fontes customizadas
├── styles/                            # Estilos globais
│   ├── _variables.scss                # Variáveis SCSS
│   ├── _mixins.scss                   # Mixins reutilizáveis
│   ├── _reset.scss                    # Reset CSS
│   └── styles.scss                    # Estilos principais
└── environments/                      # Configurações de ambiente
    ├── environment.ts                 # Desenvolvimento
    └── environment.prod.ts            # Produção
```

## 🎨 Padrões de Código

### Estrutura de Componentes

```typescript
// exemplo.component.ts
@Component({
  selector: 'app-exemplo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './exemplo.component.html',
  styleUrls: ['./exemplo.component.scss']
})
export class ExemploComponent implements OnInit {
  // Propriedades públicas
  public items: Item[] = [];
  
  // Propriedades privadas
  private subscription = new Subscription();
  
  constructor(
    private service: ExemploService,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    this.loadData();
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  
  private loadData(): void {
    // Lógica de carregamento
  }
}
```

### Services

```typescript
// exemplo.service.ts
@Injectable({
  providedIn: 'root'
})
export class ExemploService {
  private apiUrl = `${environment.apiUrl}/exemplo`;
  
  constructor(private http: HttpClient) {}
  
  getAll(): Observable<Example[]> {
    return this.http.get<Example[]>(this.apiUrl);
  }
  
  getById(id: string): Observable<Example> {
    return this.http.get<Example>(`${this.apiUrl}/${id}`);
  }
}
```

## 🔒 Segurança

### Guards de Rota

```typescript
// Proteção de rotas autenticadas
const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['SYSTEM_ADMIN'] }
  }
];
```

### Interceptors

- **AuthInterceptor**: Injeta automaticamente o token JWT em todas as requisições
- **ErrorInterceptor**: Trata erros HTTP de forma centralizada
- **LoadingInterceptor**: Controla o estado de carregamento global

## 🧪 Testes

Execute os testes unitários:

```bash
npm test
# ou
ng test
```

Execute os testes e2e:

```bash
npm run e2e
# ou
ng e2e
```

Gerar relatório de cobertura:

```bash
ng test --code-coverage
```

## 📱 Responsividade

O layout é totalmente responsivo com breakpoints:

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🎯 Features por Tipo de Usuário

### System Admin
- Gerenciamento completo de usuários
- Visualização de todas as propriedades
- Relatórios globais do sistema
- Configurações de sistema

### Supplier Admin
- Gestão de catálogo de insumos
- Gerenciamento de pedidos
- Relatórios de vendas
- Especialidades do fornecedor

### Producer
- Gestão de propriedades rurais
- Controle de estoque pessoal
- Gerenciamento de lotes
- Histórico de movimentações

## 🚀 Deploy

### Build de Produção

```bash
ng build --configuration production
```

Os arquivos de build estarão em `dist/agrowerk-frontend/`

### Opções de Deploy

- **Vercel**: Deploy automático via Git
- **Netlify**: CI/CD integrado
- **AWS S3 + CloudFront**: Hospedagem estática
- **Firebase Hosting**: Deploy rápido e CDN global

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

### Padrões de Commit

Seguimos o [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` Nova funcionalidade
- `fix:` Correção de bug
- `docs:` Documentação
- `style:` Formatação
- `refactor:` Refatoração de código
- `test:` Testes
- `chore:` Tarefas de build/config

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

**Douglas Holanda**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](seu-linkedin)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Doug16Yanc)

## 📞 Contato

Para dúvidas ou sugestões, entre em contato:

- 📧 Email: douglasholanda3195@gmail.com
- 💼 LinkedIn: [Douglas Holanda](https://www.linkedin.com/in/douglas-holanda-113519269/)

---

<div align="center">
  Desenvolvido com 💚 e ☕ por Douglas Holanda
</div>
