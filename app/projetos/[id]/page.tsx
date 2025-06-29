"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Copy, Check, Play, FileText, Code, Lightbulb } from "lucide-react"
import Link from "next/link"

export default function ProjetoDetalhePage({ params }: { params: { id: string } }) {
  const [activeStep, setActiveStep] = useState(0)
  const [copied, setCopied] = useState(false)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  // Dados do projeto baseado no ID
  const getProjectData = (id: string) => {
    const projects = {
      "1": {
        title: "Sistema de Biblioteca",
        description: "Gerencie livros, usuários e empréstimos usando POO",
        level: "iniciante",
        category: "console",
        duration: "3-4 horas",
        icon: "💻",
        objectives: [
          "Criar classes para Livro, Usuario e Biblioteca",
          "Implementar sistema de empréstimos",
          "Usar encapsulamento para proteger dados",
          "Aplicar herança para diferentes tipos de usuários",
        ],
        steps: [
          {
            title: "Estrutura Básica - Classe Livro",
            description: "Vamos começar criando a classe fundamental do nosso sistema",
            concepts: ["Classes", "__init__", "Atributos", "Métodos"],
            code: `class Livro:
    def __init__(self, titulo, autor, isbn, ano_publicacao):
        """
        Inicializa um novo livro
        
        Args:
            titulo (str): Título do livro
            autor (str): Nome do autor
            isbn (str): Código ISBN
            ano_publicacao (int): Ano de publicação
        """
        self.titulo = titulo
        self.autor = autor
        self.isbn = isbn
        self.ano_publicacao = ano_publicacao
        self.disponivel = True  # Por padrão, livro está disponível
        self.historico_emprestimos = []  # Lista de empréstimos
    
    def emprestar(self):
        """
        Marca o livro como emprestado
        
        Returns:
            bool: True se empréstimo foi realizado, False caso contrário
        """
        if self.disponivel:
            self.disponivel = False
            from datetime import datetime
            self.historico_emprestimos.append({
                'acao': 'emprestimo',
                'data': datetime.now(),
                'usuario': None  # Será preenchido depois
            })
            return True
        return False
    
    def devolver(self):
        """
        Marca o livro como disponível
        
        Returns:
            bool: True se devolução foi realizada
        """
        if not self.disponivel:
            self.disponivel = True
            from datetime import datetime
            self.historico_emprestimos.append({
                'acao': 'devolucao',
                'data': datetime.now()
            })
            return True
        return False
    
    def __str__(self):
        """Representação em string do livro"""
        status = "Disponível" if self.disponivel else "Emprestado"
        return f"'{self.titulo}' por {self.autor} ({self.ano_publicacao}) - {status}"
    
    def __repr__(self):
        """Representação técnica do livro"""
        return f"Livro('{self.titulo}', '{self.autor}', '{self.isbn}', {self.ano_publicacao})"

# Exemplo de uso
if __name__ == "__main__":
    # Criando alguns livros
    livro1 = Livro("1984", "George Orwell", "978-0451524935", 1949)
    livro2 = Livro("Dom Casmurro", "Machado de Assis", "978-8525406958", 1899)
    
    print("=== LIVROS CRIADOS ===")
    print(livro1)
    print(livro2)
    
    # Testando empréstimo
    print("\\n=== TESTANDO EMPRÉSTIMO ===")
    if livro1.emprestar():
        print(f"Livro '{livro1.titulo}' emprestado com sucesso!")
    
    print(f"Status atual: {livro1}")
    
    # Tentando emprestar novamente
    if not livro1.emprestar():
        print(f"Não foi possível emprestar '{livro1.titulo}' - já está emprestado")
    
    # Devolvendo
    print("\\n=== DEVOLVENDO LIVRO ===")
    if livro1.devolver():
        print(f"Livro '{livro1.titulo}' devolvido com sucesso!")
    
    print(f"Status final: {livro1}")`,
            explanation: `Neste primeiro passo, criamos a classe **Livro** que é a base do nosso sistema.

**Conceitos importantes:**
- **\`__init__\`**: Construtor que inicializa os atributos do livro
- **Atributos de instância**: Cada livro tem seus próprios dados
- **Métodos**: Funções que definem o comportamento do livro
- **\`__str__\` e \`__repr__\`**: Métodos especiais para representação

**Por que começar com Livro?**
- É a entidade mais simples do sistema
- Não depende de outras classes
- Permite testar conceitos básicos de POO`,
          },
          {
            title: "Classe Usuario com Encapsulamento",
            description: "Criando usuários com dados protegidos e validação",
            concepts: ["Encapsulamento", "Properties", "Validação", "Atributos privados"],
            code: `import re
from datetime import datetime, date

class Usuario:
    def __init__(self, nome, email, telefone, data_nascimento):
        """
        Inicializa um novo usuário
        
        Args:
            nome (str): Nome completo do usuário
            email (str): Email válido
            telefone (str): Telefone de contato
            data_nascimento (date): Data de nascimento
        """
        # Usar properties para validação
        self.nome = nome
        self.email = email
        self.telefone = telefone
        self.data_nascimento = data_nascimento
        
        # Atributos privados
        self.__id_usuario = self._gerar_id()
        self.__livros_emprestados = []
        self.__historico = []
        self.__ativo = True
        self.__data_cadastro = datetime.now()
    
    def _gerar_id(self):
        """Método protegido para gerar ID único"""
        import random
        return f"USR{random.randint(1000, 9999)}"
    
    @property
    def nome(self):
        return self._nome
    
    @nome.setter
    def nome(self, valor):
        """Valida e define o nome do usuário"""
        if not isinstance(valor, str) or len(valor.strip()) < 2:
            raise ValueError("Nome deve ter pelo menos 2 caracteres")
        
        # Remove espaços extras e capitaliza
        self._nome = ' '.join(valor.strip().split()).title()
    
    @property
    def email(self):
        return self._email
    
    @email.setter
    def email(self, valor):
        """Valida e define o email do usuário"""
        if not isinstance(valor, str):
            raise TypeError("Email deve ser uma string")
        
        # Regex simples para validação de email
        padrao = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
        if not re.match(padrao, valor):
            raise ValueError("Email inválido")
        
        self._email = valor.lower()
    
    @property
    def telefone(self):
        return self._telefone
    
    @telefone.setter
    def telefone(self, valor):
        """Valida e formata o telefone"""
        if not isinstance(valor, str):
            raise TypeError("Telefone deve ser uma string")
        
        # Remove caracteres não numéricos
        numeros = re.sub(r'\\D', '', valor)
        
        if len(numeros) not in [10, 11]:
            raise ValueError("Telefone deve ter 10 ou 11 dígitos")
        
        # Formata o telefone
        if len(numeros) == 10:
            self._telefone = f"({numeros[:2]}) {numeros[2:6]}-{numeros[6:]}"
        else:
            self._telefone = f"({numeros[:2]}) {numeros[2:7]}-{numeros[7:]}"
    
    @property
    def data_nascimento(self):
        return self._data_nascimento
    
    @data_nascimento.setter
    def data_nascimento(self, valor):
        """Valida a data de nascimento"""
        if not isinstance(valor, date):
            raise TypeError("Data de nascimento deve ser um objeto date")
        
        hoje = date.today()
        idade = hoje.year - valor.year - ((hoje.month, hoje.day) < (valor.month, valor.day))
        
        if idade < 0:
            raise ValueError("Data de nascimento não pode ser no futuro")
        if idade > 120:
            raise ValueError("Idade não pode ser maior que 120 anos")
        
        self._data_nascimento = valor
    
    @property
    def idade(self):
        """Calcula a idade atual"""
        hoje = date.today()
        return hoje.year - self._data_nascimento.year - (
            (hoje.month, hoje.day) < (self._data_nascimento.month, self._data_nascimento.day)
        )
    
    @property
    def id_usuario(self):
        """ID do usuário (somente leitura)"""
        return self.__id_usuario
    
    @property
    def livros_emprestados(self):
        """Lista de livros emprestados (cópia para proteção)"""
        return self.__livros_emprestados.copy()
    
    @property
    def ativo(self):
        return self.__ativo
    
    def pegar_livro_emprestado(self, livro):
        """
        Adiciona um livro à lista de empréstimos
        
        Args:
            livro: Instância da classe Livro
        """
        if livro not in self.__livros_emprestados:
            self.__livros_emprestados.append(livro)
            self.__historico.append({
                'acao': 'emprestimo',
                'livro': livro.titulo,
                'data': datetime.now()
            })
    
    def devolver_livro(self, livro):
        """
        Remove um livro da lista de empréstimos
        
        Args:
            livro: Instância da classe Livro
        """
        if livro in self.__livros_emprestados:
            self.__livros_emprestados.remove(livro)
            self.__historico.append({
                'acao': 'devolucao',
                'livro': livro.titulo,
                'data': datetime.now()
            })
    
    def get_historico(self):
        """Retorna cópia do histórico"""
        return self.__historico.copy()
    
    def __str__(self):
        return f"{self._nome} ({self._email}) - {len(self.__livros_emprestados)} livros emprestados"
    
    def __repr__(self):
        return f"Usuario('{self._nome}', '{self._email}', '{self._telefone}', {self._data_nascimento})"

# Exemplo de uso
if __name__ == "__main__":
    from datetime import date
    
    try:
        # Criando usuário
        usuario = Usuario(
            nome="  joão silva  ",  # Será formatado automaticamente
            email="JOAO@EMAIL.COM",  # Será convertido para minúsculo
            telefone="11987654321",  # Será formatado
            data_nascimento=date(1990, 5, 15)
        )
        
        print("=== USUÁRIO CRIADO ===")
        print(f"Nome: {usuario.nome}")
        print(f"Email: {usuario.email}")
        print(f"Telefone: {usuario.telefone}")
        print(f"Idade: {usuario.idade} anos")
        print(f"ID: {usuario.id_usuario}")
        
    except (ValueError, TypeError) as e:
        print(f"Erro ao criar usuário: {e}")`,
            explanation: `Neste passo, implementamos **encapsulamento** na classe Usuario.

**Conceitos importantes:**
- **Properties (@property)**: Controlam acesso aos atributos
- **Validação**: Garante que dados estão corretos
- **Atributos privados (__atributo)**: Protegem dados sensíveis
- **Formatação automática**: Melhora a qualidade dos dados

**Vantagens do encapsulamento:**
- Dados sempre válidos
- Controle total sobre acesso
- Facilita manutenção do código
- Previne erros de uso incorreto`,
          },
          {
            title: "Sistema de Biblioteca Principal",
            description: "Criando a classe que gerencia todo o sistema",
            concepts: ["Composição", "Gerenciamento de estado", "Métodos complexos"],
            code: `from datetime import datetime, date
import json

class Biblioteca:
    def __init__(self, nome, endereco):
        """
        Inicializa uma nova biblioteca
        
        Args:
            nome (str): Nome da biblioteca
            endereco (str): Endereço da biblioteca
        """
        self.nome = nome
        self.endereco = endereco
        self.__livros = []  # Lista de todos os livros
        self.__usuarios = []  # Lista de todos os usuários
        self.__emprestimos_ativos = {}  # {livro_isbn: usuario_id}
        self.__historico_geral = []
        self.__data_criacao = datetime.now()
    
    def adicionar_livro(self, livro):
        """
        Adiciona um livro ao acervo
        
        Args:
            livro: Instância da classe Livro
        """
        # Verifica se livro já existe (por ISBN)
        for l in self.__livros:
            if l.isbn == livro.isbn:
                print(f"Livro com ISBN {livro.isbn} já existe no acervo")
                return False
        
        self.__livros.append(livro)
        self.__historico_geral.append({
            'acao': 'livro_adicionado',
            'livro': livro.titulo,
            'data': datetime.now()
        })
        print(f"Livro '{livro.titulo}' adicionado ao acervo")
        return True
    
    def cadastrar_usuario(self, usuario):
        """
        Cadastra um novo usuário
        
        Args:
            usuario: Instância da classe Usuario
        """
        # Verifica se usuário já existe (por email)
        for u in self.__usuarios:
            if u.email == usuario.email:
                print(f"Usuário com email {usuario.email} já está cadastrado")
                return False
        
        self.__usuarios.append(usuario)
        self.__historico_geral.append({
            'acao': 'usuario_cadastrado',
            'usuario': usuario.nome,
            'data': datetime.now()
        })
        print(f"Usuário '{usuario.nome}' cadastrado com sucesso")
        return True
    
    def buscar_livro(self, termo, por='titulo'):
        """
        Busca livros no acervo
        
        Args:
            termo (str): Termo de busca
            por (str): Campo de busca ('titulo', 'autor', 'isbn')
        
        Returns:
            list: Lista de livros encontrados
        """
        resultados = []
        termo = termo.lower()
        
        for livro in self.__livros:
            if por == 'titulo' and termo in livro.titulo.lower():
                resultados.append(livro)
            elif por == 'autor' and termo in livro.autor.lower():
                resultados.append(livro)
            elif por == 'isbn' and termo == livro.isbn:
                resultados.append(livro)
        
        return resultados
    
    def buscar_usuario(self, termo, por='nome'):
        """
        Busca usuários cadastrados
        
        Args:
            termo (str): Termo de busca
            por (str): Campo de busca ('nome', 'email', 'id')
        
        Returns:
            Usuario or None: Usuário encontrado ou None
        """
        termo = termo.lower()
        
        for usuario in self.__usuarios:
            if por == 'nome' and termo in usuario.nome.lower():
                return usuario
            elif por == 'email' and termo == usuario.email.lower():
                return usuario
            elif por == 'id' and termo == usuario.id_usuario.lower():
                return usuario
        
        return None
    
    def emprestar_livro(self, isbn, email_usuario):
        """
        Realiza empréstimo de um livro
        
        Args:
            isbn (str): ISBN do livro
            email_usuario (str): Email do usuário
        
        Returns:
            bool: True se empréstimo foi realizado
        """
        # Busca o livro
        livro = None
        for l in self.__livros:
            if l.isbn == isbn:
                livro = l
                break
        
        if not livro:
            print(f"Livro com ISBN {isbn} não encontrado")
            return False
        
        # Busca o usuário
        usuario = self.buscar_usuario(email_usuario, 'email')
        if not usuario:
            print(f"Usuário com email {email_usuario} não encontrado")
            return False
        
        # Verifica se livro está disponível
        if not livro.disponivel:
            print(f"Livro '{livro.titulo}' não está disponível")
            return False
        
        # Verifica limite de empréstimos (máximo 3 livros)
        if len(usuario.livros_emprestados) >= 3:
            print(f"Usuário {usuario.nome} já atingiu o limite de 3 livros")
            return False
        
        # Realiza o empréstimo
        if livro.emprestar():
            usuario.pegar_livro_emprestado(livro)
            self.__emprestimos_ativos[isbn] = usuario.id_usuario
            
            self.__historico_geral.append({
                'acao': 'emprestimo_realizado',
                'livro': livro.titulo,
                'usuario': usuario.nome,
                'data': datetime.now()
            })
            
            print(f"Empréstimo realizado: '{livro.titulo}' para {usuario.nome}")
            return True
        
        return False
    
    def devolver_livro(self, isbn, email_usuario):
        """
        Realiza devolução de um livro
        
        Args:
            isbn (str): ISBN do livro
            email_usuario (str): Email do usuário
        
        Returns:
            bool: True se devolução foi realizada
        """
        # Verifica se empréstimo existe
        if isbn not in self.__emprestimos_ativos:
            print(f"Não há empréstimo ativo para o livro com ISBN {isbn}")
            return False
        
        # Busca livro e usuário
        livro = None
        for l in self.__livros:
            if l.isbn == isbn:
                livro = l
                break
        
        usuario = self.buscar_usuario(email_usuario, 'email')
        
        if not livro or not usuario:
            print("Erro: livro ou usuário não encontrado")
            return False
        
        # Verifica se o usuário realmente tem o livro
        if self.__emprestimos_ativos[isbn] != usuario.id_usuario:
            print("Erro: este livro não está emprestado para este usuário")
            return False
        
        # Realiza a devolução
        if livro.devolver():
            usuario.devolver_livro(livro)
            del self.__emprestimos_ativos[isbn]
            
            self.__historico_geral.append({
                'acao': 'devolucao_realizada',
                'livro': livro.titulo,
                'usuario': usuario.nome,
                'data': datetime.now()
            })
            
            print(f"Devolução realizada: '{livro.titulo}' por {usuario.nome}")
            return True
        
        return False
    
    def relatorio_acervo(self):
        """Gera relatório do acervo"""
        total_livros = len(self.__livros)
        livros_disponiveis = sum(1 for l in self.__livros if l.disponivel)
        livros_emprestados = total_livros - livros_disponiveis
        
        print(f"\\n=== RELATÓRIO DO ACERVO - {self.nome} ===")
        print(f"Total de livros: {total_livros}")
        print(f"Livros disponíveis: {livros_disponiveis}")
        print(f"Livros emprestados: {livros_emprestados}")
        print(f"Total de usuários: {len(self.__usuarios)}")
        print(f"Empréstimos ativos: {len(self.__emprestimos_ativos)}")
    
    def listar_emprestimos_ativos(self):
        """Lista todos os empréstimos ativos"""
        print(f"\\n=== EMPRÉSTIMOS ATIVOS ===")
        if not self.__emprestimos_ativos:
            print("Nenhum empréstimo ativo")
            return
        
        for isbn, usuario_id in self.__emprestimos_ativos.items():
            livro = next(l for l in self.__livros if l.isbn == isbn)
            usuario = next(u for u in self.__usuarios if u.id_usuario == usuario_id)
            print(f"• '{livro.titulo}' → {usuario.nome} ({usuario.email})")
    
    @property
    def total_livros(self):
        return len(self.__livros)
    
    @property
    def total_usuarios(self):
        return len(self.__usuarios)

# Exemplo de uso completo
if __name__ == "__main__":
    # Criando a biblioteca
    biblioteca = Biblioteca("Biblioteca Central", "Rua das Flores, 123")
    
    # Criando livros
    livro1 = Livro("1984", "George Orwell", "978-0451524935", 1949)
    livro2 = Livro("Dom Casmurro", "Machado de Assis", "978-8525406958", 1899)
    livro3 = Livro("O Cortiço", "Aluísio Azevedo", "978-8508133024", 1890)
    
    # Adicionando livros
    biblioteca.adicionar_livro(livro1)
    biblioteca.adicionar_livro(livro2)
    biblioteca.adicionar_livro(livro3)
    
    # Criando usuários
    usuario1 = Usuario("Ana Silva", "ana@email.com", "11987654321", date(1995, 3, 10))
    usuario2 = Usuario("Carlos Santos", "carlos@email.com", "11876543210", date(1988, 7, 22))
    
    # Cadastrando usuários
    biblioteca.cadastrar_usuario(usuario1)
    biblioteca.cadastrar_usuario(usuario2)
    
    # Realizando empréstimos
    biblioteca.emprestar_livro("978-0451524935", "ana@email.com")
    biblioteca.emprestar_livro("978-8525406958", "carlos@email.com")
    
    # Relatórios
    biblioteca.relatorio_acervo()
    biblioteca.listar_emprestimos_ativos()`,
            explanation: `Agora criamos a classe **Biblioteca** que coordena todo o sistema.

**Conceitos importantes:**
- **Composição**: Biblioteca contém livros e usuários
- **Gerenciamento de estado**: Controla empréstimos ativos
- **Validações complexas**: Verifica regras de negócio
- **Relatórios**: Fornece informações do sistema

**Funcionalidades implementadas:**
- Adicionar livros e usuários
- Buscar por diferentes critérios
- Realizar empréstimos e devoluções
- Gerar relatórios
- Manter histórico de operações`,
          },
          {
            title: "Herança - Tipos de Usuários",
            description: "Criando diferentes tipos de usuários com herança",
            concepts: ["Herança", "super()", "Polimorfismo", "Especialização"],
            code: `from datetime import date, datetime, timedelta

# Classe base Usuario (já criada anteriormente)
# Vamos criar especializações

class UsuarioComum(Usuario):
    """Usuário comum com limitações padrão"""
    
    def __init__(self, nome, email, telefone, data_nascimento):
        super().__init__(nome, email, telefone, data_nascimento)
        self.__limite_livros = 3
        self.__dias_emprestimo = 14
        self.__multa_por_dia = 2.0
    
    @property
    def limite_livros(self):
        return self.__limite_livros
    
    @property
    def dias_emprestimo(self):
        return self.__dias_emprestimo
    
    def calcular_multa(self, dias_atraso):
        """Calcula multa por atraso"""
        return dias_atraso * self.__multa_por_dia
    
    def pode_emprestar(self):
        """Verifica se pode emprestar mais livros"""
        return len(self.livros_emprestados) < self.__limite_livros
    
    def __str__(self):
        return f"[COMUM] {super().__str__()}"

class UsuarioEstudante(Usuario):
    """Usuário estudante com benefícios especiais"""
    
    def __init__(self, nome, email, telefone, data_nascimento, instituicao, curso):
        super().__init__(nome, email, telefone, data_nascimento)
        self.instituicao = instituicao
        self.curso = curso
        self.__limite_livros = 5  # Mais livros que usuário comum
        self.__dias_emprestimo = 21  # Mais tempo
        self.__multa_por_dia = 1.0  # Multa reduzida
        self.__desconto_multa = 0.5  # 50% de desconto
    
    @property
    def limite_livros(self):
        return self.__limite_livros
    
    @property
    def dias_emprestimo(self):
        return self.__dias_emprestimo
    
    def calcular_multa(self, dias_atraso):
        """Calcula multa com desconto estudantil"""
        multa_base = dias_atraso * self.__multa_por_dia
        return multa_base * self.__desconto_multa
    
    def pode_emprestar(self):
        """Verifica se pode emprestar mais livros"""
        return len(self.livros_emprestados) < self.__limite_livros
    
    def renovar_emprestimo(self, livro):
        """Estudantes podem renovar empréstimos"""
        if livro in self.livros_emprestados:
            print(f"Empréstimo de '{livro.titulo}' renovado por mais {self.__dias_emprestimo} dias")
            return True
        return False
    
    def __str__(self):
        return f"[ESTUDANTE] {super().__str__()} - {self.curso} ({self.instituicao})"

class UsuarioProfessor(Usuario):
    """Usuário professor com privilégios máximos"""
    
    def __init__(self, nome, email, telefone, data_nascimento, instituicao, departamento):
        super().__init__(nome, email, telefone, data_nascimento)
        self.instituicao = instituicao
        self.departamento = departamento
        self.__limite_livros = 10  # Limite alto
        self.__dias_emprestimo = 30  # Muito tempo
        self.__multa_por_dia = 0.5  # Multa mínima
        self.__pode_reservar = True
    
    @property
    def limite_livros(self):
        return self.__limite_livros
    
    @property
    def dias_emprestimo(self):
        return self.__dias_emprestimo
    
    def calcular_multa(self, dias_atraso):
        """Calcula multa reduzida para professores"""
        return dias_atraso * self.__multa_por_dia
    
    def pode_emprestar(self):
        """Professores têm limite alto"""
        return len(self.livros_emprestados) < self.__limite_livros
    
    def renovar_emprestimo(self, livro):
        """Professores podem renovar múltiplas vezes"""
        if livro in self.livros_emprestados:
            print(f"Empréstimo de '{livro.titulo}' renovado por mais {self.__dias_emprestimo} dias")
            return True
        return False
    
    def reservar_livro(self, livro):
        """Professores podem reservar livros emprestados"""
        if self.__pode_reservar and not livro.disponivel:
            print(f"Livro '{livro.titulo}' reservado para {self.nome}")
            return True
        return False
    
    def __str__(self):
        return f"[PROFESSOR] {super().__str__()} - {self.departamento} ({self.instituicao})"

# Classe Biblioteca atualizada para trabalhar com herança
class BibliotecaAvancada(Biblioteca):
    """Biblioteca que suporta diferentes tipos de usuários"""
    
    def __init__(self, nome, endereco):
        super().__init__(nome, endereco)
        self.__reservas = {}  # {isbn: [lista_usuarios]}
    
    def emprestar_livro_avancado(self, isbn, email_usuario):
        """
        Empréstimo considerando tipo de usuário
        """
        # Busca o livro
        livro = None
        for l in self._Biblioteca__livros:
            if l.isbn == isbn:
                livro = l
                break
        
        if not livro:
            print(f"Livro com ISBN {isbn} não encontrado")
            return False
        
        # Busca o usuário
        usuario = self.buscar_usuario(email_usuario, 'email')
        if not usuario:
            print(f"Usuário com email {email_usuario} não encontrado")
            return False
        
        # Verifica se livro está disponível
        if not livro.disponivel:
            print(f"Livro '{livro.titulo}' não está disponível")
            return False
        
        # Verifica limite específico do tipo de usuário
        if not usuario.pode_emprestar():
            limite = usuario.limite_livros
            print(f"Usuário {usuario.nome} já atingiu o limite de {limite} livros")
            return False
        
        # Realiza o empréstimo
        if livro.emprestar():
            usuario.pegar_livro_emprestado(livro)
            self._Biblioteca__emprestimos_ativos[isbn] = usuario.id_usuario
            
            # Calcula data de devolução baseada no tipo de usuário
            data_devolucao = datetime.now() + timedelta(days=usuario.dias_emprestimo)
            
            self._Biblioteca__historico_geral.append({
                'acao': 'emprestimo_realizado',
                'livro': livro.titulo,
                'usuario': usuario.nome,
                'tipo_usuario': type(usuario).__name__,
                'data_devolucao': data_devolucao,
                'data': datetime.now()
            })
            
            print(f"Empréstimo realizado: '{livro.titulo}' para {usuario.nome}")
            print(f"Data de devolução: {data_devolucao.strftime('%d/%m/%Y')}")
            return True
        
        return False
    
    def relatorio_por_tipo_usuario(self):
        """Relatório separado por tipo de usuário"""
        tipos = {}
        
        for usuario in self._Biblioteca__usuarios:
            tipo = type(usuario).__name__
            if tipo not in tipos:
                tipos[tipo] = {'count': 0, 'livros_emprestados': 0}
            
            tipos[tipo]['count'] += 1
            tipos[tipo]['livros_emprestados'] += len(usuario.livros_emprestados)
        
        print(f"\\n=== RELATÓRIO POR TIPO DE USUÁRIO ===")
        for tipo, dados in tipos.items():
            print(f"{tipo}: {dados['count']} usuários, {dados['livros_emprestados']} livros emprestados")

# Exemplo de uso com herança
if __name__ == "__main__":
    # Criando biblioteca avançada
    biblioteca = BibliotecaAvancada("Biblioteca Universitária", "Campus Central")
    
    # Criando diferentes tipos de usuários
    usuario_comum = UsuarioComum(
        "João Silva", "joao@email.com", "11987654321", date(1985, 5, 15)
    )
    
    estudante = UsuarioEstudante(
        "Maria Santos", "maria@email.com", "11876543210", date(2000, 8, 20),
        "Universidade Federal", "Ciência da Computação"
    )
    
    professor = UsuarioProfessor(
        "Dr. Carlos Oliveira", "carlos@email.com", "11765432109", date(1975, 12, 3),
        "Universidade Federal", "Departamento de Informática"
    )
    
    # Cadastrando usuários
    biblioteca.cadastrar_usuario(usuario_comum)
    biblioteca.cadastrar_usuario(estudante)
    biblioteca.cadastrar_usuario(professor)
    
    # Criando e adicionando livros
    livro1 = Livro("Python Programming", "John Doe", "978-1234567890", 2023)
    livro2 = Livro("Data Structures", "Jane Smith", "978-0987654321", 2022)
    
    biblioteca.adicionar_livro(livro1)
    biblioteca.adicionar_livro(livro2)
    
    # Testando empréstimos com diferentes tipos
    print("\\n=== TESTANDO EMPRÉSTIMOS ===")
    biblioteca.emprestar_livro_avancado("978-1234567890", "joao@email.com")
    biblioteca.emprestar_livro_avancado("978-0987654321", "maria@email.com")
    
    # Mostrando informações dos usuários
    print("\\n=== USUÁRIOS CADASTRADOS ===")
    print(usuario_comum)
    print(estudante)
    print(professor)
    
    # Relatórios
    biblioteca.relatorio_por_tipo_usuario()
    
    # Testando funcionalidades específicas
    print("\\n=== FUNCIONALIDADES ESPECÍFICAS ===")
    print(f"Limite do estudante: {estudante.limite_livros} livros")
    print(f"Dias de empréstimo do professor: {professor.dias_emprestimo} dias")
    print(f"Multa do usuário comum (5 dias): R$ {usuario_comum.calcular_multa(5):.2f}")`,
            explanation: `Implementamos **herança** para criar diferentes tipos de usuários.

**Conceitos importantes:**
- **Herança**: Classes filhas herdam da classe pai
- **super()**: Chama métodos da classe pai
- **Polimorfismo**: Mesmo método, comportamentos diferentes
- **Especialização**: Cada tipo tem suas regras

**Vantagens da herança:**
- Reutilização de código
- Especialização de comportamento
- Facilita manutenção
- Permite tratamento uniforme`,
          },
          {
            title: "Interface de Usuário e Finalização",
            description: "Criando uma interface simples para interagir com o sistema",
            concepts: ["Interface de usuário", "Menu interativo", "Tratamento de erros"],
            code: `import os
from datetime import date

class InterfaceBiblioteca:
    """Interface de linha de comando para o sistema de biblioteca"""
    
    def __init__(self):
        self.biblioteca = BibliotecaAvancada("Biblioteca Central", "Rua Principal, 123")
        self.executando = True
    
    def limpar_tela(self):
        """Limpa a tela do terminal"""
        os.system('cls' if os.name == 'nt' else 'clear')
    
    def pausar(self):
        """Pausa para o usuário ler a mensagem"""
        input("\\nPressione Enter para continuar...")
    
    def mostrar_menu_principal(self):
        """Exibe o menu principal"""
        print("\\n" + "="*50)
        print("    SISTEMA DE BIBLIOTECA - MENU PRINCIPAL")
        print("="*50)
        print("1. Gerenciar Livros")
        print("2. Gerenciar Usuários")
        print("3. Empréstimos e Devoluções")
        print("4. Relatórios")
        print("5. Buscar")
        print("0. Sair")
        print("="*50)
    
    def menu_livros(self):
        """Menu de gerenciamento de livros"""
        while True:
            self.limpar_tela()
            print("\\n" + "="*40)
            print("    GERENCIAR LIVROS")
            print("="*40)
            print("1. Adicionar Livro")
            print("2. Listar Todos os Livros")
            print("3. Buscar Livro")
            print("0. Voltar")
            
            opcao = input("\\nEscolha uma opção: ").strip()
            
            if opcao == "1":
                self.adicionar_livro()
            elif opcao == "2":
                self.listar_livros()
            elif opcao == "3":
                self.buscar_livros()
            elif opcao == "0":
                break
            else:
                print("Opção inválida!")
                self.pausar()
    
    def adicionar_livro(self):
        """Adiciona um novo livro"""
        print("\\n=== ADICIONAR NOVO LIVRO ===")
        try:
            titulo = input("Título: ").strip()
            autor = input("Autor: ").strip()
            isbn = input("ISBN: ").strip()
            ano = int(input("Ano de publicação: "))
            
            if not all([titulo, autor, isbn]):
                print("Todos os campos são obrigatórios!")
                self.pausar()
                return
            
            livro = Livro(titulo, autor, isbn, ano)
            if self.biblioteca.adicionar_livro(livro):
                print("\\nLivro adicionado com sucesso!")
            
        except ValueError:
            print("Ano deve ser um número válido!")
        except Exception as e:
            print(f"Erro ao adicionar livro: {e}")
        
        self.pausar()
    
    def listar_livros(self):
        """Lista todos os livros"""
        print("\\n=== TODOS OS LIVROS ===")
        livros = self.biblioteca._Biblioteca__livros
        
        if not livros:
            print("Nenhum livro cadastrado.")
        else:
            for i, livro in enumerate(livros, 1):
                print(f"{i}. {livro}")
        
        self.pausar()
    
    def menu_usuarios(self):
        """Menu de gerenciamento de usuários"""
        while True:
            self.limpar_tela()
            print("\\n" + "="*40)
            print("    GERENCIAR USUÁRIOS")
            print("="*40)
            print("1. Cadastrar Usuário Comum")
            print("2. Cadastrar Estudante")
            print("3. Cadastrar Professor")
            print("4. Listar Usuários")
            print("0. Voltar")
            
            opcao = input("\\nEscolha uma opção: ").strip()
            
            if opcao == "1":
                self.cadastrar_usuario_comum()
            elif opcao == "2":
                self.cadastrar_estudante()
            elif opcao == "3":
                self.cadastrar_professor()
            elif opcao == "4":
                self.listar_usuarios()
            elif opcao == "0":
                break
            else:
                print("Opção inválida!")
                self.pausar()
    
    def cadastrar_usuario_comum(self):
        """Cadastra um usuário comum"""
        print("\\n=== CADASTRAR USUÁRIO COMUM ===")
        try:
            nome = input("Nome completo: ").strip()
            email = input("Email: ").strip()
            telefone = input("Telefone: ").strip()
            
            print("Data de nascimento:")
            dia = int(input("Dia: "))
            mes = int(input("Mês: "))
            ano = int(input("Ano: "))
            data_nasc = date(ano, mes, dia)
            
            usuario = UsuarioComum(nome, email, telefone, data_nasc)
            if self.biblioteca.cadastrar_usuario(usuario):
                print("\\nUsuário cadastrado com sucesso!")
                print(f"ID gerado: {usuario.id_usuario}")
            
        except ValueError as e:
            print(f"Erro nos dados: {e}")
        except Exception as e:
            print(f"Erro ao cadastrar usuário: {e}")
        
        self.pausar()
    
    def cadastrar_estudante(self):
        """Cadastra um estudante"""
        print("\\n=== CADASTRAR ESTUDANTE ===")
        try:
            nome = input("Nome completo: ").strip()
            email = input("Email: ").strip()
            telefone = input("Telefone: ").strip()
            instituicao = input("Instituição: ").strip()
            curso = input("Curso: ").strip()
            
            print("Data de nascimento:")
            dia = int(input("Dia: "))
            mes = int(input("Mês: "))
            ano = int(input("Ano: "))
            data_nasc = date(ano, mes, dia)
            
            usuario = UsuarioEstudante(nome, email, telefone, data_nasc, instituicao, curso)
            if self.biblioteca.cadastrar_usuario(usuario):
                print("\\nEstudante cadastrado com sucesso!")
                print(f"ID gerado: {usuario.id_usuario}")
                print(f"Limite de livros: {usuario.limite_livros}")
            
        except ValueError as e:
            print(f"Erro nos dados: {e}")
        except Exception as e:
            print(f"Erro ao cadastrar estudante: {e}")
        
        self.pausar()
    
    def menu_emprestimos(self):
        """Menu de empréstimos e devoluções"""
        while True:
            self.limpar_tela()
            print("\\n" + "="*40)
            print("    EMPRÉSTIMOS E DEVOLUÇÕES")
            print("="*40)
            print("1. Realizar Empréstimo")
            print("2. Realizar Devolução")
            print("3. Listar Empréstimos Ativos")
            print("0. Voltar")
            
            opcao = input("\\nEscolha uma opção: ").strip()
            
            if opcao == "1":
                self.realizar_emprestimo()
            elif opcao == "2":
                self.realizar_devolucao()
            elif opcao == "3":
                self.biblioteca.listar_emprestimos_ativos()
                self.pausar()
            elif opcao == "0":
                break
            else:
                print("Opção inválida!")
                self.pausar()
    
    def realizar_emprestimo(self):
        """Realiza um empréstimo"""
        print("\\n=== REALIZAR EMPRÉSTIMO ===")
        isbn = input("ISBN do livro: ").strip()
        email = input("Email do usuário: ").strip()
        
        if self.biblioteca.emprestar_livro_avancado(isbn, email):
            print("\\nEmpréstimo realizado com sucesso!")
        else:
            print("\\nNão foi possível realizar o empréstimo.")
        
        self.pausar()
    
    def realizar_devolucao(self):
        """Realiza uma devolução"""
        print("\\n=== REALIZAR DEVOLUÇÃO ===")
        isbn = input("ISBN do livro: ").strip()
        email = input("Email do usuário: ").strip()
        
        if self.biblioteca.devolver_livro(isbn, email):
            print("\\nDevolução realizada com sucesso!")
        else:
            print("\\nNão foi possível realizar a devolução.")
        
        self.pausar()
    
    def menu_relatorios(self):
        """Menu de relatórios"""
        while True:
            self.limpar_tela()
            print("\\n" + "="*40)
            print("    RELATÓRIOS")
            print("="*40)
            print("1. Relatório do Acervo")
            print("2. Relatório por Tipo de Usuário")
            print("3. Empréstimos Ativos")
            print("0. Voltar")
            
            opcao = input("\\nEscolha uma opção: ").strip()
            
            if opcao == "1":
                self.biblioteca.relatorio_acervo()
                self.pausar()
            elif opcao == "2":
                self.biblioteca.relatorio_por_tipo_usuario()
                self.pausar()
            elif opcao == "3":
                self.biblioteca.listar_emprestimos_ativos()
                self.pausar()
            elif opcao == "0":
                break
            else:
                print("Opção inválida!")
                self.pausar()
    
    def executar(self):
        """Executa o sistema"""
        print("Bem-vindo ao Sistema de Biblioteca!")
        
        # Dados de exemplo
        self.carregar_dados_exemplo()
        
        while self.executando:
            self.limpar_tela()
            self.mostrar_menu_principal()
            
            opcao = input("\\nEscolha uma opção: ").strip()
            
            if opcao == "1":
                self.menu_livros()
            elif opcao == "2":
                self.menu_usuarios()
            elif opcao == "3":
                self.menu_emprestimos()
            elif opcao == "4":
                self.menu_relatorios()
            elif opcao == "5":
                self.menu_busca()
            elif opcao == "0":
                print("\\nObrigado por usar o Sistema de Biblioteca!")
                self.executando = False
            else:
                print("Opção inválida!")
                self.pausar()
    
    def carregar_dados_exemplo(self):
        """Carrega alguns dados de exemplo"""
        # Livros de exemplo
        livros_exemplo = [
            Livro("1984", "George Orwell", "978-0451524935", 1949),
            Livro("Dom Casmurro", "Machado de Assis", "978-8525406958", 1899),
            Livro("Python Programming", "John Doe", "978-1234567890", 2023),
        ]
        
        for livro in livros_exemplo:
            self.biblioteca.adicionar_livro(livro)
        
        # Usuários de exemplo
        usuario1 = UsuarioComum("Ana Silva", "ana@email.com", "11987654321", date(1990, 5, 15))
        estudante1 = UsuarioEstudante("Carlos Santos", "carlos@email.com", "11876543210", 
                                    date(2000, 8, 20), "UFSP", "Ciência da Computação")
        
        self.biblioteca.cadastrar_usuario(usuario1)
        self.biblioteca.cadastrar_usuario(estudante1)

# Função principal para executar o sistema
def main():
    """Função principal"""
    sistema = InterfaceBiblioteca()
    sistema.executar()

if __name__ == "__main__":
    main()`,
            explanation: `Finalizamos com uma **interface de usuário** completa.

**Conceitos importantes:**
- **Interface de linha de comando**: Menus interativos
- **Tratamento de erros**: Try/except para validação
- **Organização**: Separação de responsabilidades
- **Usabilidade**: Sistema fácil de usar

**Sistema completo inclui:**
- Gerenciamento de livros e usuários
- Sistema de empréstimos
- Relatórios detalhados
- Busca por diferentes critérios
- Interface amigável

**Parabéns!** Você criou um sistema completo de biblioteca usando todos os conceitos de POO em Python!`,
          },
        ],
      },
      "2": {
        title: "Jogo RPG com Classes",
        description: "Sistema de personagens com diferentes classes e habilidades",
        level: "intermediario",
        category: "jogos",
        duration: "6-8 horas",
        icon: "🎮",
        objectives: [
          "Implementar herança com classes de personagens",
          "Usar polimorfismo para diferentes ataques",
          "Criar sistema de combate baseado em turnos",
          "Aplicar classes abstratas e interfaces",
        ],
        steps: [
          {
            title: "Classe Base Personagem",
            description: "Criando a classe abstrata base para todos os personagens",
            concepts: ["Classes Abstratas", "ABC", "Métodos abstratos"],
            code: `from abc import ABC, abstractmethod
from enum import Enum
import random

class TipoPersonagem(Enum):
    """Enumeração para tipos de personagem"""
    GUERREIRO = "Guerreiro"
    MAGO = "Mago"
    ARQUEIRO = "Arqueiro"
    LADINO = "Ladino"

class StatusEfeito(Enum):
    """Efeitos que podem afetar personagens"""
    NORMAL = "Normal"
    ENVENENADO = "Envenenado"
    QUEIMANDO = "Queimando"
    CONGELADO = "Congelado"
    ATORDOADO = "Atordoado"

class Personagem(ABC):
    """
    Classe abstrata base para todos os personagens do jogo
    """
    
    def __init__(self, nome, vida_maxima, mana_maxima, forca, defesa, agilidade):
        self._nome = nome
        self._vida_maxima = vida_maxima
        self._vida_atual = vida_maxima
        self._mana_maxima = mana_maxima
        self._mana_atual = mana_maxima
        self._forca = forca
        self._defesa = defesa
        self._agilidade = agilidade
        self._nivel = 1
        self._experiencia = 0
        self._status_efeito = StatusEfeito.NORMAL
        self._turnos_efeito = 0
        self._vivo = True
    
    # Properties para acesso controlado aos atributos
    @property
    def nome(self):
        return self._nome
    
    @property
    def vida_atual(self):
        return self._vida_atual
    
    @property
    def vida_maxima(self):
        return self._vida_maxima
    
    @property
    def mana_atual(self):
        return self._mana_atual
    
    @property
    def mana_maxima(self):
        return self._mana_maxima
    
    @property
    def forca(self):
        return self._forca
    
    @property
    def defesa(self):
        return self._defesa
    
    @property
    def agilidade(self):
        return self._agilidade
    
    @property
    def nivel(self):
        return self._nivel
    
    @property
    def vivo(self):
        return self._vivo
    
    @property
    def status_efeito(self):
        return self._status_efeito
    
    # Métodos abstratos que devem ser implementados pelas subclasses
    @abstractmethod
    def atacar(self, alvo):
        """Método abstrato para ataque básico"""
        pass
    
    @abstractmethod
    def habilidade_especial(self, alvo=None):
        """Método abstrato para habilidade especial"""
        pass
    
    @abstractmethod
    def get_tipo(self):
        """Retorna o tipo do personagem"""
        pass
    
    # Métodos concretos compartilhados
    def receber_dano(self, dano):
        """
        Aplica dano ao personagem considerando defesa
        
        Args:
            dano (int): Quantidade de dano bruto
            
        Returns:
            int: Dano efetivo aplicado
        """
        # Calcula dano considerando defesa
        dano_efetivo = max(1, dano - self._defesa // 2)
        
        self._vida_atual = max(0, self._vida_atual - dano_efetivo)
        
        if self._vida_atual == 0:
            self._vivo = False
            print(f"💀 {self._nome} foi derrotado!")
        else:
            print(f"💥 {self._nome} recebeu {dano_efetivo} de dano! Vida: {self._vida_atual}/{self._vida_maxima}")
        
        return dano_efetivo
    
    def curar(self, quantidade):
        """
        Cura o personagem
        
        Args:
            quantidade (int): Quantidade de cura
        """
        if not self._vivo:
            return
        
        cura_efetiva = min(quantidade, self._vida_maxima - self._vida_atual)
        self._vida_atual += cura_efetiva
        
        if cura_efetiva > 0:
            print(f"💚 {self._nome} recuperou {cura_efetiva} de vida! Vida: {self._vida_atual}/{self._vida_maxima}")
    
    def gastar_mana(self, quantidade):
        """
        Gasta mana para habilidades
        
        Args:
            quantidade (int): Quantidade de mana a gastar
            
        Returns:
            bool: True se tinha mana suficiente
        """
        if self._mana_atual >= quantidade:
            self._mana_atual -= quantidade
            return True
        return False
    
    def recuperar_mana(self, quantidade):
        """Recupera mana"""
        self._mana_atual = min(self._mana_maxima, self._mana_atual + quantidade)
    
    def aplicar_efeito(self, efeito, turnos):
        """
        Aplica um efeito de status
        
        Args:
            efeito (StatusEfeito): Tipo do efeito
            turnos (int): Duração em turnos
        """
        self._status_efeito = efeito
        self._turnos_efeito = turnos
        print(f"✨ {self._nome} está {efeito.value} por {turnos} turnos!")
    
    def processar_efeito_turno(self):
        """Processa efeitos de status no início do turno"""
        if self._status_efeito == StatusEfeito.NORMAL:
            return
        
        if self._status_efeito == StatusEfeito.ENVENENADO:
            dano = max(1, self._vida_maxima // 10)  # 10% da vida máxima
            print(f"☠️ {self._nome} sofre {dano} de dano por veneno!")
            self.receber_dano(dano)
        
        elif self._status_efeito == StatusEfeito.QUEIMANDO:
            dano = max(1, self._vida_maxima // 8)  # 12.5% da vida máxima
            print(f"🔥 {self._nome} sofre {dano} de dano por queimadura!")
            self.receber_dano(dano)
        
        elif self._status_efeito == StatusEfeito.CONGELADO:
            print(f"🧊 {self._nome} está congelado e não pode agir!")
            return False  # Não pode agir
        
        elif self._status_efeito == StatusEfeito.ATORDOADO:
            if random.random() < 0.5:  # 50% de chance de não poder agir
                print(f"😵 {self._nome} está atordoado e perde o turno!")
                return False
        
        # Reduz duração do efeito
        self._turnos_efeito -= 1
        if self._turnos_efeito <= 0:
            print(f"✅ {self._nome} se recuperou do efeito {self._status_efeito.value}")
            self._status_efeito = StatusEfeito.NORMAL
        
        return True  # Pode agir
    
    def ganhar_experiencia(self, exp):
        """
        Ganha experiência e pode subir de nível
        
        Args:
            exp (int): Quantidade de experiência
        """
        self._experiencia += exp
        exp_necessaria = self._nivel * 100  # 100 exp por nível
        
        if self._experiencia >= exp_necessaria:
            self._subir_nivel()
    
    def _subir_nivel(self):
        """Sobe de nível e melhora atributos"""
        self._nivel += 1
        self._experiencia = 0
        
        # Melhora atributos
        bonus_vida = 20
        bonus_mana = 10
        bonus_atributo = 2
        
        self._vida_maxima += bonus_vida
        self._vida_atual += bonus_vida  # Cura ao subir de nível
        self._mana_maxima += bonus_mana
        self._mana_atual += bonus_mana
        self._forca += bonus_atributo
        self._defesa += bonus_atributo
        self._agilidade += bonus_atributo
        
        print(f"🎉 {self._nome} subiu para o nível {self._nivel}!")
        print(f"   Vida: +{bonus_vida}, Mana: +{bonus_mana}")
        print(f"   Força: +{bonus_atributo}, Defesa: +{bonus_atributo}, Agilidade: +{bonus_atributo}")
    
    def get_info_completa(self):
        """Retorna informações completas do personagem"""
        return {
            'nome': self._nome,
            'tipo': self.get_tipo().value,
            'nivel': self._nivel,
            'vida': f"{self._vida_atual}/{self._vida_maxima}",
            'mana': f"{self._mana_atual}/{self._mana_maxima}",
            'forca': self._forca,
            'defesa': self._defesa,
            'agilidade': self._agilidade,
            'status': self._status_efeito.value,
            'vivo': self._vivo
        }
    
    def __str__(self):
        status_icon = "💀" if not self._vivo else "❤️"
        efeito_str = f" [{self._status_efeito.value}]" if self._status_efeito != StatusEfeito.NORMAL else ""
        
        return (f"{status_icon} {self._nome} (Nv.{self._nivel} {self.get_tipo().value}){efeito_str}\\n"
                f"   Vida: {self._vida_atual}/{self._vida_maxima} | "
                f"Mana: {self._mana_atual}/{self._mana_maxima}")") | "
                f"Mana: {self._mana_atual}/{self._mana_maxima}")

# Exemplo de uso da classe abstrata
if __name__ == "__main__":
    # Não podemos instanciar a classe abstrata diretamente
    # personagem = Personagem("Teste", 100, 50, 10, 5, 8)  # Erro!
    
    print("Classe Personagem criada com sucesso!")
    print("Esta é uma classe abstrata que serve como base para todos os personagens.")
    print("\\nPróximo passo: Implementar classes concretas como Guerreiro, Mago, etc.")`,
            explanation: `Criamos a **classe abstrata base** para todos os personagens.

**Conceitos importantes:**
- **ABC (Abstract Base Class)**: Classe que não pode ser instanciada
- **@abstractmethod**: Métodos que devem ser implementados pelas subclasses
- **Enum**: Para definir constantes organizadas
- **Properties**: Acesso controlado aos atributos

**Funcionalidades implementadas:**
- Sistema de vida e mana
- Efeitos de status (veneno, queimadura, etc.)
- Sistema de experiência e níveis
- Métodos abstratos para especialização`,
          },
          {
            title: "Classes de Personagens - Guerreiro e Mago",
            description: "Implementando as primeiras classes concretas",
            concepts: ["Herança", "Polimorfismo", "super()", "Especialização"],
            code: `class Guerreiro(Personagem):
    """
    Classe Guerreiro - Especialista em combate corpo a corpo
    """
    
    def __init__(self, nome):
        # Guerreiros têm mais vida e força, menos mana
        super().__init__(
            nome=nome,
            vida_maxima=150,  # Mais vida
            mana_maxima=30,   # Pouca mana
            forca=18,         # Muita força
            defesa=15,        # Boa defesa
            agilidade=8       # Pouca agilidade
        )
        self._furia = 0  # Atributo especial do guerreiro
        self._max_furia = 100
    
    def get_tipo(self):
        return TipoPersonagem.GUERREIRO
    
    def atacar(self, alvo):
        """
        Ataque básico do guerreiro - Golpe de Espada
        """
        if not self._vivo or not alvo.vivo:
            return False
        
        # Dano base + variação aleatória
        dano_base = self._forca + random.randint(5, 15)
        
        # Chance de crítico (15%)
        if random.random() < 0.15:
            dano_base *= 2
            print(f"⚔️ CRÍTICO! {self._nome} desfere um golpe devastador!")
        else:
            print(f"⚔️ {self._nome} ataca com a espada!")
        
        # Ganha fúria ao atacar
        self._ganhar_furia(10)
        
        alvo.receber_dano(dano_base)
        return True
    
    def habilidade_especial(self, alvo=None):
        """
        Habilidade especial: Investida Furiosa
        Consome toda a fúria para um ataque poderoso
        """
        if not self._vivo:
            return False
        
        if self._furia < 50:
            print(f"❌ {self._nome} precisa de pelo menos 50 de fúria! (Atual: {self._furia})")
            return False
        
        if not alvo or not alvo.vivo:
            print(f"❌ {self._nome} precisa de um alvo válido!")
            return False
        
        print(f"🔥 {self._nome} entra em FÚRIA e executa uma Investida Furiosa!")
        
        # Dano baseado na fúria acumulada
        multiplicador_furia = self._furia / 100
        dano = int(self._forca * 2.5 * multiplicador_furia) + random.randint(10, 20)
        
        # Chance de atordoar o inimigo
        if random.random() < 0.3:
            alvo.aplicar_efeito(StatusEfeito.ATORDOADO, 2)
        
        # Consome toda a fúria
        self._furia = 0
        
        alvo.receber_dano(dano)
        return True
    
    def defender(self):
        """
        Habilidade de defesa - reduz dano recebido no próximo turno
        """
        print(f"🛡️ {self._nome} assume posição defensiva!")
        # Temporariamente dobra a defesa
        self._defesa_original = self._defesa
        self._defesa *= 2
        self._ganhar_furia(5)
        return True
    
    def _ganhar_furia(self, quantidade):
        """Ganha fúria durante o combate"""
        self._furia = min(self._max_furia, self._furia + quantidade)
        if self._furia == self._max_furia:
            print(f"🔥 {self._nome} está em FÚRIA MÁXIMA!")
    
    @property
    def furia(self):
        return self._furia
    
    def get_info_completa(self):
        info = super().get_info_completa()
        info['furia'] = f"{self._furia}/{self._max_furia}"
        return info

class Mago(Personagem):
    """
    Classe Mago - Especialista em magia e feitiços
    """
    
    def __init__(self, nome):
        # Magos têm menos vida física, mas muita mana
        super().__init__(
            nome=nome,
            vida_maxima=80,   # Menos vida
            mana_maxima=120,  # Muita mana
            forca=8,          # Pouca força física
            defesa=6,         # Pouca defesa
            agilidade=12      # Agilidade moderada
        )
        self._escola_magia = "Elementalista"
        self._feiticos_conhecidos = ["Bola de Fogo", "Raio de Gelo", "Cura"]
    
    def get_tipo(self):
        return TipoPersonagem.MAGO
    
    def atacar(self, alvo):
        """
        Ataque básico do mago - Míssil Mágico
        """
        if not self._vivo or not alvo.vivo:
            return False
        
        custo_mana = 15
        if not self.gastar_mana(custo_mana):
            print(f"❌ {self._nome} não tem mana suficiente! (Precisa: {custo_mana})")
            return False
        
        print(f"✨ {self._nome} lança um Míssil Mágico!")
        
        # Dano mágico baseado na inteligência (usamos agilidade como base)
        dano = self._agilidade * 2 + random.randint(8, 16)
        
        # Chance de efeito elemental aleatório
        if random.random() < 0.25:
            efeitos = [StatusEfeito.QUEIMANDO, StatusEfeito.CONGELADO]
            efeito = random.choice(efeitos)
            alvo.aplicar_efeito(efeito, 3)
        
        alvo.receber_dano(dano)
        return True
    
    def habilidade_especial(self, alvo=None):
        """
        Habilidade especial: Tempestade Elemental
        Ataque em área que pode afetar múltiplos inimigos
        """
        if not self._vivo:
            return False
        
        custo_mana = 40
        if not self.gastar_mana(custo_mana):
            print(f"❌ {self._nome} não tem mana suficiente! (Precisa: {custo_mana})")
            return False
        
        print(f"⚡ {self._nome} invoca uma TEMPESTADE ELEMENTAL!")
        
        if alvo and alvo.vivo:
            # Dano principal no alvo
            dano_principal = self._agilidade * 3 + random.randint(20, 35)
            alvo.receber_dano(dano_principal)
            
            # Chance de aplicar múltiplos efeitos
            if random.random() < 0.4:
                alvo.aplicar_efeito(StatusEfeito.ATORDOADO, 2)
            if random.random() < 0.3:
                alvo.aplicar_efeito(StatusEfeito.QUEIMANDO, 4)
        
        return True
    
    def curar_aliado(self, alvo):
        """
        Feitiço de cura para aliados
        """
        custo_mana = 25
        if not self.gastar_mana(custo_mana):
            print(f"❌ {self._nome} não tem mana suficiente para curar!")
            return False
        
        if not alvo.vivo:
            print(f"❌ Não é possível curar {alvo.nome} - está morto!")
            return False
        
        print(f"💚 {self._nome} lança Cura em {alvo.nome}!")
        
        # Cura baseada no nível e agilidade
        cura = self._agilidade * 2 + self._nivel * 5 + random.randint(15, 25)
        alvo.curar(cura)
        
        # Chance de remover efeitos negativos
        if random.random() < 0.3 and alvo.status_efeito != StatusEfeito.NORMAL:
            print(f"✨ A cura também remove o efeito {alvo.status_efeito.value}!")
            alvo._status_efeito = StatusEfeito.NORMAL
            alvo._turnos_efeito = 0
        
        return True
    
    def meditar(self):
        """
        Recupera mana meditando (perde o turno)
        """
        print(f"🧘 {self._nome} medita para recuperar mana...")
        mana_recuperada = self._mana_maxima // 4  # 25% da mana máxima
        self.recuperar_mana(mana_recuperada)
        print(f"✨ {self._nome} recuperou {mana_recuperada} de mana!")
        return True
    
    def get_info_completa(self):
        info = super().get_info_completa()
        info['escola_magia'] = self._escola_magia
        info['feiticos'] = len(self._feiticos_conhecidos)
        return info

# Exemplo de uso das classes
if __name__ == "__main__":
    print("=== CRIANDO PERSONAGENS ===")
    
    # Criando um guerreiro
    guerreiro = Guerreiro("Thorin Escudo-de-Ferro")
    print(guerreiro)
    print(f"Fúria: {guerreiro.furia}/100\\n")
    
    # Criando um mago
    mago = Mago("Gandalf, o Sábio")
    print(mago)
    print()
    
    print("=== SIMULANDO COMBATE ===")
    
    # Guerreiro ataca mago
    print("\\n--- Turno 1: Guerreiro ataca ---")
    guerreiro.atacar(mago)
    print(f"Fúria do guerreiro: {guerreiro.furia}/100")
    
    # Mago contra-ataca
    print("\\n--- Turno 2: Mago contra-ataca ---")
    mago.atacar(guerreiro)
    
    # Guerreiro usa habilidade especial (se tiver fúria suficiente)
    print("\\n--- Turno 3: Guerreiro tenta habilidade especial ---")
    if not guerreiro.habilidade_especial(mago):
        # Se não conseguir, ataca normalmente
        guerreiro.atacar(mago)
    
    # Mago usa cura em si mesmo
    print("\\n--- Turno 4: Mago se cura ---")
    mago.curar_aliado(mago)
    
    print("\\n=== STATUS FINAL ===")
    print(guerreiro)
    print(mago)
    
    # Informações completas
    print("\\n=== INFORMAÇÕES DETALHADAS ===")
    print("Guerreiro:", guerreiro.get_info_completa())
    print("Mago:", mago.get_info_completa())`,
            explanation: `Implementamos as primeiras **classes concretas** com herança.

**Conceitos importantes:**
- **Herança**: Guerreiro e Mago herdam de Personagem
- **super()**: Chama o construtor da classe pai
- **Polimorfismo**: Mesmo método, comportamentos diferentes
- **Especialização**: Cada classe tem habilidades únicas

**Características únicas:**
- **Guerreiro**: Sistema de fúria, ataques físicos poderosos
- **Mago**: Sistema de mana, feitiços elementais, cura
- **Balanceamento**: Cada classe tem pontos fortes e fracos`,
          },
          {
            title: "Sistema de Combate",
            description: "Criando o motor de combate baseado em turnos",
            concepts: ["Gerenciamento de estado", "Algoritmos", "Interação entre objetos"],
            code: `import time
from typing import List, Optional

class SistemaCombate:
    """
    Sistema de combate baseado em turnos para o jogo RPG
    """
    
    def __init__(self):
        self.combatentes = []
        self.turno_atual = 0
        self.rodada = 1
        self.combate_ativo = False
        self.vencedor = None
        self.historico_combate = []
    
    def iniciar_combate(self, personagens: List[Personagem]):
        """
        Inicia um combate com os personagens fornecidos
        
        Args:
            personagens: Lista de personagens que participarão do combate
        """
        if len(personagens) < 2:
            print("❌ É necessário pelo menos 2 personagens para iniciar o combate!")
            return False
        
        self.combatentes = [p for p in personagens if p.vivo]
        if len(self.combatentes) < 2:
            print("❌ É necessário pelo menos 2 personagens vivos!")
            return False
        
        # Ordena por agilidade (mais ágil age primeiro)
        self.combatentes.sort(key=lambda x: x.agilidade, reverse=True)
        
        self.combate_ativo = True
        self.turno_atual = 0
        self.rodada = 1
        self.vencedor = None
        self.historico_combate = []
        
        print("\\n" + "="*60)
        print("🗡️  COMBATE INICIADO!  ⚔️")
        print("="*60)
        print("\\nOrdem de iniciativa (por agilidade):")
        for i, personagem in enumerate(self.combatentes, 1):
            print(f"{i}. {personagem.nome} (Agilidade: {personagem.agilidade})")
        
        print("\\n" + "="*60)
        return True
    
    def executar_turno(self):
        """
        Executa um turno completo de combate
        """
        if not self.combate_ativo:
            return False
        
        personagem_atual = self.combatentes[self.turno_atual]
        
        print(f"\\n--- RODADA {self.rodada} - TURNO DE {personagem_atual.nome.upper()} ---")
        
        # Processa efeitos de status
        if not personagem_atual.processar_efeito_turno():
            # Personagem não pode agir devido a efeito
            self._proximo_turno()
            return True
        
        # Se o personagem morreu devido a efeito, remove do combate
        if not personagem_atual.vivo:
            self._remover_personagem(personagem_atual)
            return True
        
        # Mostra status atual
        self._mostrar_status_combate()
        
        # Executa ação do personagem
        self._executar_acao_personagem(personagem_atual)
        
        # Verifica condições de vitória
        if self._verificar_fim_combate():
            return False
        
        self._proximo_turno()
        return True
    
    def _executar_acao_personagem(self, personagem):
        """
        Executa a ação de um personagem (IA simples ou input do jogador)
        """
        # Lista de possíveis alvos (todos exceto o próprio personagem)
        alvos_possiveis = [p for p in self.combatentes if p != personagem and p.vivo]
        
        if not alvos_possiveis:
            return
        
        # IA simples para demonstração
        acao = self._decidir_acao_ia(personagem, alvos_possiveis)
        
        if acao['tipo'] == 'atacar':
            personagem.atacar(acao['alvo'])
        elif acao['tipo'] == 'habilidade_especial':
            if not personagem.habilidade_especial(acao['alvo']):
                # Se não conseguir usar habilidade especial, ataca
                personagem.atacar(acao['alvo'])
        elif acao['tipo'] == 'curar' and hasattr(personagem, 'curar_aliado'):
            personagem.curar_aliado(acao['alvo'])
        elif acao['tipo'] == 'defender' and hasattr(personagem, 'defender'):
            personagem.defender()
        elif acao['tipo'] == 'meditar' and hasattr(personagem, 'meditar'):
            personagem.meditar()
        
        # Registra ação no histórico
        self.historico_combate.append({
            'rodada': self.rodada,
            'personagem': personagem.nome,
            'acao': acao['tipo'],
            'alvo': acao['alvo'].nome if acao['alvo'] else None
        })
    
    def _decidir_acao_ia(self, personagem, alvos_possiveis):
        """
        IA simples para decidir ações dos personagens
        """
        # Estratégia básica baseada no tipo e situação
        
        # Se está com pouca vida (menos de 30%), tenta se curar (se for mago)
        if (personagem.vida_atual / personagem.vida_maxima < 0.3 and 
            hasattr(personagem, 'curar_aliado') and 
            personagem.mana_atual >= 25):
            return {'tipo': 'curar', 'alvo': personagem}
        
        # Se é mago e está com pouca mana (menos de 20%), medita
        if (hasattr(personagem, 'meditar') and 
            personagem.mana_atual / personagem.mana_maxima < 0.2):
            return {'tipo': 'meditar', 'alvo': None}
        
        # Escolhe o alvo com menos vida
        alvo = min(alvos_possiveis, key=lambda x: x.vida_atual)
        
        # 30% de chance de usar habilidade especial
        if random.random() < 0.3:
            return {'tipo': 'habilidade_especial', 'alvo': alvo}
        
        # 10% de chance de defender (se for guerreiro)
        if hasattr(personagem, 'defender') and random.random() < 0.1:
            return {'tipo': 'defender', 'alvo': None}
        
        # Ação padrão: atacar
        return {'tipo': 'atacar', 'alvo': alvo}
    
    def _mostrar_status_combate(self):
        """Mostra o status atual de todos os combatentes"""
        print("\\n📊 STATUS DOS COMBATENTES:")
        for personagem in self.combatentes:
            if personagem.vivo:
                vida_percent = (personagem.vida_atual / personagem.vida_maxima) * 100
                mana_percent = (personagem.mana_atual / personagem.mana_maxima) * 100
                
                # Barra de vida visual
                vida_bar = "█" * int(vida_percent // 10) + "░" * (10 - int(vida_percent // 10))
                mana_bar = "█" * int(mana_percent // 10) + "░" * (10 - int(mana_percent // 10))
                
                print(f"  {personagem.nome}:")
                print(f"    ❤️  Vida: [{vida_bar}] {personagem.vida_atual}/{personagem.vida_maxima}")
                print(f"    💙 Mana: [{mana_bar}] {personagem.mana_atual}/{personagem.mana_maxima}")
                
                if personagem.status_efeito != StatusEfeito.NORMAL:
                    print(f"    ✨ Efeito: {personagem.status_efeito.value} ({personagem._turnos_efeito} turnos)")
                
                # Informações específicas da classe
                if hasattr(personagem, 'furia'):
                    furia_percent = (personagem.furia / 100) * 100
                    furia_bar = "█" * int(furia_percent // 10) + "░" * (10 - int(furia_percent // 10))
                    print(f"    🔥 Fúria: [{furia_bar}] {personagem.furia}/100")
        print()
    
    def _proximo_turno(self):
        """Avança para o próximo turno"""
        self.turno_atual = (self.turno_atual + 1) % len(self.combatentes)
        
        # Se voltou para o primeiro personagem, nova rodada
        if self.turno_atual == 0:
            self.rodada += 1
            print(f"\\n🔄 NOVA RODADA: {self.rodada}")
    
    def _remover_personagem(self, personagem):
        """Remove um personagem morto do combate"""
        if personagem in self.combatentes:
            self.combatentes.remove(personagem)
            print(f"💀 {personagem.nome} foi eliminado do combate!")
            
            # Ajusta o índice do turno atual
            if self.turno_atual >= len(self.combatentes):
                self.turno_atual = 0
    
    def _verificar_fim_combate(self):
        """Verifica se o combate terminou"""
        personagens_vivos = [p for p in self.combatentes if p.vivo]
        
        if len(personagens_vivos) <= 1:
            self.combate_ativo = False
            
            if len(personagens_vivos) == 1:
                self.vencedor = personagens_vivos[0]
                print(f"\\n🏆 VITÓRIA! {self.vencedor.nome} venceu o combate!")
                
                # Ganha experiência por vencer
                exp_ganha = 50 * self.rodada
                self.vencedor.ganhar_experiencia(exp_ganha)
                print(f"✨ {self.vencedor.nome} ganhou {exp_ganha} pontos de experiência!")
                
            else:
                print("\\n💀 EMPATE! Todos os combatentes foram derrotados!")
            
            print("\\n" + "="*60)
            print("🏁 COMBATE FINALIZADO!")
            print("="*60)
            
            return True
        
        return False
    
    def obter_relatorio_combate(self):
        """Retorna um relatório detalhado do combate"""
        if not self.historico_combate:
            return "Nenhum combate foi realizado ainda."
        
        relatorio = f"\\n📋 RELATÓRIO DO COMBATE\\n"
        relatorio += f"Duração: {self.rodada} rodadas\\n"
        relatorio += f"Vencedor: {self.vencedor.nome if self.vencedor else 'Empate'}\\n\\n"
        
        relatorio += "📜 Histórico de Ações:\\n"
        for acao in self.historico_combate:
            alvo_str = f" → {acao['alvo']}" if acao['alvo'] else ""
            relatorio += f"  R{acao['rodada']}: {acao['personagem']} usou {acao['acao']}{alvo_str}\\n"
        
        return relatorio

# Exemplo de uso do sistema de combate
if __name__ == "__main__":
    print("=== DEMONSTRAÇÃO DO SISTEMA DE COMBATE ===\\n")
    
    # Criando personagens
    guerreiro1 = Guerreiro("Aragorn")
    mago1 = Mago("Gandalf")
    guerreiro2 = Guerreiro("Boromir")
    
    print("Personagens criados:")
    print(f"1. {guerreiro1}")
    print(f"2. {mago1}")
    print(f"3. {guerreiro2}")
    
    # Criando sistema de combate
    combate = SistemaCombate()
    
    # Iniciando combate
    if combate.iniciar_combate([guerreiro1, mago1, guerreiro2]):
        
        # Executa o combate automaticamente
        print("\\n🤖 Executando combate automático...")
        time.sleep(2)
        
        turno = 1
        while combate.combate_ativo and turno <= 20:  # Limite de 20 turnos
            print(f"\\n⏰ Executando turno {turno}...")
            time.sleep(1)  # Pausa para visualização
            
            if not combate.executar_turno():
                break
            
            turno += 1
            
            # Pausa entre turnos
            if combate.combate_ativo:
                time.sleep(1.5)
        
        # Mostra relatório final
        print(combate.obter_relatorio_combate())
    
    else:
        print("❌ Não foi possível iniciar o combate!")`,
            explanation: `Implementamos um **sistema de combate completo** baseado em turnos.

**Conceitos importantes:**
- **Gerenciamento de estado**: Controla turnos, rodadas, combatentes
- **IA simples**: Personagens tomam decisões automaticamente
- **Algoritmos**: Ordenação por agilidade, verificação de condições
- **Interação entre objetos**: Personagens interagem através do sistema

**Funcionalidades do sistema:**
- Ordem de iniciativa baseada em agilidade
- Processamento automático de efeitos de status
- IA básica para decisões de combate
- Sistema de relatórios e histórico
- Interface visual com barras de vida/mana`,
          },
        ],
      },
    }

    return projects[id] || null
  }

  const project = getProjectData(params.id)

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Projeto não encontrado</h1>
          <Link href="/projetos">
            <Button>Voltar para Projetos</Button>
          </Link>
        </div>
      </div>
    )
  }

  const copyCode = () => {
    navigator.clipboard.writeText(project.steps[activeStep].code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const markStepCompleted = (stepIndex: number) => {
    if (!completedSteps.includes(stepIndex)) {
      setCompletedSteps([...completedSteps, stepIndex])
    }
  }

  const progressPercentage = (completedSteps.length / project.steps.length) * 100

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/projetos">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar
                </Button>
              </Link>
              <div className="text-2xl">{project.icon}</div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">{project.title}</h1>
                <p className="text-sm text-gray-600">{project.description}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge
                className={`${
                  project.level === "iniciante"
                    ? "bg-green-100 text-green-800"
                    : project.level === "intermediario"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                }`}
              >
                {project.level}
              </Badge>
              <div className="text-sm text-gray-600">{project.duration}</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Progresso do Projeto</span>
              <span className="text-sm text-gray-600">
                {completedSteps.length}/{project.steps.length} passos
              </span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Sidebar com navegação dos passos */}
          <div className="lg:col-span-3">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-lg">Passos do Projeto</CardTitle>
                <CardDescription>Siga a sequência para completar o projeto</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {project.steps.map((step, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveStep(index)}
                    className={`w-full text-left p-3 rounded-lg border transition-colors ${
                      activeStep === index
                        ? "bg-green-50 border-green-200 text-green-800"
                        : completedSteps.includes(index)
                          ? "bg-blue-50 border-blue-200 text-blue-800"
                          : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          completedSteps.includes(index)
                            ? "bg-blue-600 text-white"
                            : activeStep === index
                              ? "bg-green-600 text-white"
                              : "bg-gray-300 text-gray-600"
                        }`}
                      >
                        {completedSteps.includes(index) ? "✓" : index + 1}
                      </div>
                      <div>
                        <div className="font-medium text-sm">{step.title}</div>
                        <div className="text-xs opacity-75">{step.description}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Conteúdo principal */}
          <div className="lg:col-span-9">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Explicação do passo */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center space-x-2">
                          <FileText className="h-5 w-5" />
                          <span>
                            Passo {activeStep + 1}: {project.steps[activeStep].title}
                          </span>
                        </CardTitle>
                        <CardDescription className="mt-2">{project.steps[activeStep].description}</CardDescription>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => markStepCompleted(activeStep)}
                        disabled={completedSteps.includes(activeStep)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        {completedSteps.includes(activeStep) ? "✓ Concluído" : "Marcar como Concluído"}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Conceitos abordados */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                        <Lightbulb className="h-4 w-4 mr-2" />
                        Conceitos Abordados
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.steps[activeStep].concepts.map((concept, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-xs bg-blue-50 text-blue-700 border-blue-200"
                          >
                            {concept}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Explicação detalhada */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Explicação</h4>
                      <div className="prose prose-sm max-w-none text-gray-700">
                        {project.steps[activeStep].explanation.split("\n").map((paragraph, index) => (
                          <p key={index} className="mb-3 leading-relaxed">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Objetivos do projeto */}
                {activeStep === 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Objetivos do Projeto</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {project.objectives.map((objective, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-sm text-gray-700">{objective}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Código do passo */}
              <div className="space-y-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center space-x-2">
                        <Code className="h-5 w-5" />
                        <span>Código Python</span>
                      </CardTitle>
                      <CardDescription>Implementação do passo atual</CardDescription>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={copyCode}>
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        <Play className="h-4 w-4 mr-2" />
                        Executar
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto max-h-96 overflow-y-auto">
                      <pre className="whitespace-pre-wrap">{project.steps[activeStep].code}</pre>
                    </div>
                  </CardContent>
                </Card>

                {/* Navegação entre passos */}
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-center">
                      <Button
                        variant="outline"
                        onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                        disabled={activeStep === 0}
                      >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Passo Anterior
                      </Button>

                      <div className="text-sm text-gray-600">
                        {activeStep + 1} de {project.steps.length}
                      </div>

                      <Button
                        onClick={() => setActiveStep(Math.min(project.steps.length - 1, activeStep + 1))}
                        disabled={activeStep === project.steps.length - 1}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Próximo Passo
                        <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Conclusão do projeto */}
                {activeStep === project.steps.length - 1 && (
                  <Card className="border-green-200 bg-green-50">
                    <CardHeader>
                      <CardTitle className="text-green-800">🎉 Parabéns!</CardTitle>
                      <CardDescription className="text-green-700">
                        Você completou o projeto {project.title}!
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <p className="text-sm text-green-700">
                          Agora você domina os conceitos de POO aplicados neste projeto. Continue praticando com outros
                          projetos!
                        </p>
                        <div className="flex space-x-2">
                          <Link href="/projetos">
                            <Button
                              variant="outline"
                              className="border-green-300 text-green-700 hover:bg-green-100 bg-transparent"
                            >
                              Ver Outros Projetos
                            </Button>
                          </Link>
                          <Link href="/conceitos/classes-objetos">
                            <Button className="bg-green-600 hover:bg-green-700">Revisar Conceitos</Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
