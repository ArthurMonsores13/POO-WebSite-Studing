"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Search, Star, Clock, Users, ExternalLink, Play } from "lucide-react"
import Link from "next/link"

export default function ProjetosPythonPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedLevel, setSelectedLevel] = useState("todos")
  const [selectedCategory, setSelectedCategory] = useState("todos")

  const projects = [
    {
      id: 1,
      title: "Sistema de Biblioteca",
      description: "Gerencie livros, usuários e empréstimos usando POO",
      level: "iniciante",
      category: "console",
      duration: "3-4 horas",
      rating: 4.9,
      students: 1450,
      technologies: ["Classes", "Herança", "Encapsulamento", "Listas"],
      preview: `class Livro:
    def __init__(self, titulo, autor, isbn):
        self.titulo = titulo
        self.autor = autor
        self.isbn = isbn
        self.disponivel = True
        self.historico_emprestimos = []
    
    def emprestar(self, usuario):
        if self.disponivel:
            self.disponivel = False
            self.historico_emprestimos.append({
                'usuario': usuario.nome,
                'data': datetime.now(),
                'tipo': 'emprestimo'
            })
            return True
        return False
    
    def devolver(self):
        if not self.disponivel:
            self.disponivel = True
            self.historico_emprestimos.append({
                'data': datetime.now(),
                'tipo': 'devolucao'
            })
            return True
        return False
    
    def __str__(self):
        status = "Disponível" if self.disponivel else "Emprestado"
        return f"{self.titulo} por {self.autor} - {status}"

class Usuario:
    def __init__(self, nome, email):
        self.nome = nome
        self.email = email
        self.livros_emprestados = []
    
    def pegar_livro(self, livro):
        if livro.emprestar(self):
            self.livros_emprestados.append(livro)
            print(f"{self.nome} pegou o livro: {livro.titulo}")
            return True
        print(f"Livro {livro.titulo} não disponível")
        return False`,
    },
    {
      id: 2,
      title: "Jogo RPG com Classes",
      description: "Sistema de personagens com diferentes classes e habilidades",
      level: "intermediario",
      category: "jogos",
      duration: "6-8 horas",
      rating: 4.8,
      students: 890,
      technologies: ["Herança", "Polimorfismo", "ABC", "Enum"],
      preview: `from abc import ABC, abstractmethod
from enum import Enum
import random

class TipoPersonagem(Enum):
    GUERREIRO = "Guerreiro"
    MAGO = "Mago"
    ARQUEIRO = "Arqueiro"

class Personagem(ABC):
    def __init__(self, nome, vida, mana):
        self.nome = nome
        self.vida_maxima = vida
        self.vida_atual = vida
        self.mana_maxima = mana
        self.mana_atual = mana
        self.nivel = 1
        self.experiencia = 0
    
    @abstractmethod
    def atacar(self, alvo):
        pass
    
    @abstractmethod
    def habilidade_especial(self, alvo=None):
        pass
    
    def receber_dano(self, dano):
        self.vida_atual = max(0, self.vida_atual - dano)
        print(f"{self.nome} recebeu {dano} de dano!")
        
        if self.vida_atual == 0:
            print(f"{self.nome} foi derrotado!")
            return True
        return False
    
    def curar(self, quantidade):
        self.vida_atual = min(self.vida_maxima, self.vida_atual + quantidade)
        print(f"{self.nome} recuperou {quantidade} de vida!")
    
    def esta_vivo(self):
        return self.vida_atual > 0

class Guerreiro(Personagem):
    def __init__(self, nome):
        super().__init__(nome, vida=120, mana=30)
        self.forca = 15
        self.defesa = 10
    
    def atacar(self, alvo):
        dano = random.randint(10, self.forca)
        print(f"{self.nome} ataca {alvo.nome} com a espada!")
        return alvo.receber_dano(dano)
    
    def habilidade_especial(self, alvo=None):
        if self.mana_atual >= 15:
            self.mana_atual -= 15
            dano = self.forca * 2
            print(f"{self.nome} usa Golpe Devastador!")
            return alvo.receber_dano(dano)
        print("Mana insuficiente!")
        return False`,
    },
    {
      id: 3,
      title: "Sistema de E-commerce",
      description: "Plataforma completa com produtos, carrinho e pagamentos",
      level: "avancado",
      category: "web",
      duration: "12-15 horas",
      rating: 4.7,
      students: 567,
      technologies: ["Flask", "SQLAlchemy", "Decorators", "Context Managers"],
      preview: `from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from decimal import Decimal

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///ecommerce.db'
db = SQLAlchemy(app)

class Produto(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    preco = db.Column(db.Numeric(10, 2), nullable=False)
    estoque = db.Column(db.Integer, default=0)
    categoria_id = db.Column(db.Integer, db.ForeignKey('categoria.id'))
    
    def __init__(self, nome, preco, estoque, categoria_id):
        self.nome = nome
        self.preco = Decimal(str(preco))
        self.estoque = estoque
        self.categoria_id = categoria_id
    
    def reduzir_estoque(self, quantidade):
        if self.estoque >= quantidade:
            self.estoque -= quantidade
            return True
        return False
    
    def to_dict(self):
        return {
            'id': self.id,
            'nome': self.nome,
            'preco': float(self.preco),
            'estoque': self.estoque
        }

class CarrinhoCompras:
    def __init__(self, usuario_id):
        self.usuario_id = usuario_id
        self.itens = []
        self.desconto = Decimal('0')
    
    def adicionar_item(self, produto, quantidade):
        for item in self.itens:
            if item['produto'].id == produto.id:
                item['quantidade'] += quantidade
                return
        
        self.itens.append({
            'produto': produto,
            'quantidade': quantidade,
            'preco_unitario': produto.preco
        })
    
    def calcular_total(self):
        subtotal = sum(
            item['preco_unitario'] * item['quantidade'] 
            for item in self.itens
        )
        return subtotal - self.desconto
    
    def aplicar_desconto(self, valor):
        self.desconto = Decimal(str(valor))`,
    },
    {
      id: 4,
      title: "Simulador de Banco",
      description: "Sistema bancário com contas, transações e relatórios",
      level: "intermediario",
      category: "financeiro",
      duration: "5-7 horas",
      rating: 4.6,
      students: 1100,
      technologies: ["Properties", "Context Managers", "Logging", "JSON"],
      preview: `import json
import logging
from datetime import datetime
from contextlib import contextmanager

class ContaBancaria:
    def __init__(self, numero, titular, saldo_inicial=0):
        self._numero = numero
        self._titular = titular
        self._saldo = saldo_inicial
        self._historico = []
        self._ativa = True
        
        # Configurar logging
        logging.basicConfig(level=logging.INFO)
        self.logger = logging.getLogger(f"Conta-{numero}")
    
    @property
    def saldo(self):
        return self._saldo
    
    @property
    def numero(self):
        return self._numero
    
    @property
    def titular(self):
        return self._titular
    
    def depositar(self, valor):
        if not self._ativa:
            raise ValueError("Conta inativa")
        
        if valor <= 0:
            raise ValueError("Valor deve ser positivo")
        
        self._saldo += valor
        transacao = {
            'tipo': 'deposito',
            'valor': valor,
            'data': datetime.now().isoformat(),
            'saldo_anterior': self._saldo - valor,
            'saldo_atual': self._saldo
        }
        self._historico.append(transacao)
        self.logger.info(f"Depósito de R$ {valor:.2f} realizado")
        return True
    
    def sacar(self, valor):
        if not self._ativa:
            raise ValueError("Conta inativa")
        
        if valor <= 0:
            raise ValueError("Valor deve ser positivo")
        
        if valor > self._saldo:
            raise ValueError("Saldo insuficiente")
        
        self._saldo -= valor
        transacao = {
            'tipo': 'saque',
            'valor': valor,
            'data': datetime.now().isoformat(),
            'saldo_anterior': self._saldo + valor,
            'saldo_atual': self._saldo
        }
        self._historico.append(transacao)
        self.logger.info(f"Saque de R$ {valor:.2f} realizado")
        return True
    
    @contextmanager
    def transacao_atomica(self):
        """Context manager para transações atômicas"""
        saldo_backup = self._saldo
        historico_backup = self._historico.copy()
        
        try:
            yield self
        except Exception as e:
            # Rollback em caso de erro
            self._saldo = saldo_backup
            self._historico = historico_backup
            self.logger.error(f"Transação falhou: {e}")
            raise
        else:
            self.logger.info("Transação concluída com sucesso")`,
    },
    {
      id: 5,
      title: "Sistema de Gestão Escolar",
      description: "Gerencie alunos, professores, turmas e notas",
      level: "intermediario",
      category: "educacional",
      duration: "8-10 horas",
      rating: 4.8,
      students: 723,
      technologies: ["Dataclasses", "Type Hints", "Validators", "CSV"],
      preview: `from dataclasses import dataclass, field
from typing import List, Dict, Optional
from datetime import date
import csv

@dataclass
class Pessoa:
    nome: str
    cpf: str
    data_nascimento: date
    email: str
    telefone: str = ""
    
    def __post_init__(self):
        self.validar_cpf()
        self.validar_email()
    
    def validar_cpf(self):
        # Validação simples de CPF
        cpf_numeros = ''.join(filter(str.isdigit, self.cpf))
        if len(cpf_numeros) != 11:
            raise ValueError("CPF deve ter 11 dígitos")
    
    def validar_email(self):
        if '@' not in self.email or '.' not in self.email:
            raise ValueError("Email inválido")
    
    @property
    def idade(self):
        hoje = date.today()
        return hoje.year - self.data_nascimento.year - (
            (hoje.month, hoje.day) < 
            (self.data_nascimento.month, self.data_nascimento.day)
        )

@dataclass
class Aluno(Pessoa):
    matricula: str
    turma: Optional[str] = None
    notas: Dict[str, List[float]] = field(default_factory=dict)
    faltas: Dict[str, int] = field(default_factory=dict)
    
    def adicionar_nota(self, disciplina: str, nota: float):
        if not 0 <= nota <= 10:
            raise ValueError("Nota deve estar entre 0 e 10")
        
        if disciplina not in self.notas:
            self.notas[disciplina] = []
        
        self.notas[disciplina].append(nota)
    
    def calcular_media(self, disciplina: str) -> float:
        if disciplina not in self.notas or not self.notas[disciplina]:
            return 0.0
        
        return sum(self.notas[disciplina]) / len(self.notas[disciplina])
    
    def situacao_disciplina(self, disciplina: str) -> str:
        media = self.calcular_media(disciplina)
        faltas = self.faltas.get(disciplina, 0)
        
        if faltas > 15:  # Mais de 15 faltas = reprovado por falta
            return "Reprovado por Falta"
        elif media >= 7.0:
            return "Aprovado"
        elif media >= 5.0:
            return "Recuperação"
        else:
            return "Reprovado"

@dataclass
class Professor(Pessoa):
    registro: str
    disciplinas: List[str] = field(default_factory=list)
    salario: float = 0.0
    
    def adicionar_disciplina(self, disciplina: str):
        if disciplina not in self.disciplinas:
            self.disciplinas.append(disciplina)
    
    def remover_disciplina(self, disciplina: str):
        if disciplina in self.disciplinas:
            self.disciplinas.remove(disciplina)`,
    },
    {
      id: 6,
      title: "API REST com FastAPI",
      description: "API moderna com autenticação, validação e documentação automática",
      level: "avancado",
      category: "api",
      duration: "10-12 horas",
      rating: 4.5,
      students: 445,
      technologies: ["FastAPI", "Pydantic", "JWT", "Async/Await"],
      preview: `from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel, EmailStr, validator
from typing import List, Optional
import jwt
from datetime import datetime, timedelta
import hashlib

app = FastAPI(title="API de Tarefas", version="1.0.0")
security = HTTPBearer()

# Modelos Pydantic
class UsuarioBase(BaseModel):
    email: EmailStr
    nome: str
    ativo: bool = True

class UsuarioCreate(UsuarioBase):
    senha: str
    
    @validator('senha')
    def validar_senha(cls, v):
        if len(v) < 8:
            raise ValueError('Senha deve ter pelo menos 8 caracteres')
        return v

class Usuario(UsuarioBase):
    id: int
    data_criacao: datetime
    
    class Config:
        orm_mode = True

class TarefaBase(BaseModel):
    titulo: str
    descricao: Optional[str] = None
    concluida: bool = False
    prioridade: int = 1
    
    @validator('prioridade')
    def validar_prioridade(cls, v):
        if not 1 <= v <= 5:
            raise ValueError('Prioridade deve estar entre 1 e 5')
        return v

class TarefaCreate(TarefaBase):
    pass

class Tarefa(TarefaBase):
    id: int
    usuario_id: int
    data_criacao: datetime
    data_atualizacao: Optional[datetime] = None
    
    class Config:
        orm_mode = True

# Classe de serviço
class UsuarioService:
    def __init__(self):
        self.usuarios = {}
        self.proximo_id = 1
    
    def criar_hash_senha(self, senha: str) -> str:
        return hashlib.sha256(senha.encode()).hexdigest()
    
    def criar_usuario(self, usuario_data: UsuarioCreate) -> Usuario:
        usuario_dict = usuario_data.dict()
        usuario_dict['senha'] = self.criar_hash_senha(usuario_dict['senha'])
        usuario_dict['id'] = self.proximo_id
        usuario_dict['data_criacao'] = datetime.now()
        
        self.usuarios[self.proximo_id] = usuario_dict
        self.proximo_id += 1
        
        return Usuario(**usuario_dict)
    
    def autenticar(self, email: str, senha: str) -> Optional[Usuario]:
        for usuario in self.usuarios.values():
            if (usuario['email'] == email and 
                usuario['senha'] == self.criar_hash_senha(senha)):
                return Usuario(**usuario)
        return None

# Instância do serviço
usuario_service = UsuarioService()

# Endpoints
@app.post("/usuarios/", response_model=Usuario, status_code=status.HTTP_201_CREATED)
async def criar_usuario(usuario: UsuarioCreate):
    try:
        return usuario_service.criar_usuario(usuario)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))`,
    },
  ]

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLevel = selectedLevel === "todos" || project.level === selectedLevel
    const matchesCategory = selectedCategory === "todos" || project.category === selectedCategory

    return matchesSearch && matchesLevel && matchesCategory
  })

  const getLevelColor = (level: string) => {
    switch (level) {
      case "iniciante":
        return "bg-green-100 text-green-800"
      case "intermediario":
        return "bg-yellow-100 text-yellow-800"
      case "avancado":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "console":
        return "💻"
      case "jogos":
        return "🎮"
      case "web":
        return "🌐"
      case "financeiro":
        return "💰"
      case "educacional":
        return "🎓"
      case "api":
        return "🔗"
      default:
        return "📁"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Button>
            </Link>
            <div className="text-2xl">🐍</div>
            <h1 className="text-2xl font-bold text-gray-900">Projetos Python POO</h1>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              {filteredProjects.length} projetos
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Filtros */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Encontre o Projeto Perfeito</CardTitle>
            <CardDescription>
              Projetos práticos focados em POO com Python. Filtre por nível e categoria.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Pesquisar projetos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger>
                  <SelectValue placeholder="Nível" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os níveis</SelectItem>
                  <SelectItem value="iniciante">Iniciante</SelectItem>
                  <SelectItem value="intermediario">Intermediário</SelectItem>
                  <SelectItem value="avancado">Avançado</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todas as categorias</SelectItem>
                  <SelectItem value="console">Console</SelectItem>
                  <SelectItem value="jogos">Jogos</SelectItem>
                  <SelectItem value="web">Web</SelectItem>
                  <SelectItem value="financeiro">Financeiro</SelectItem>
                  <SelectItem value="educacional">Educacional</SelectItem>
                  <SelectItem value="api">API</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Lista de Projetos */}
        <div className="grid lg:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{getCategoryIcon(project.category)}</span>
                    <div>
                      <CardTitle className="text-lg">{project.title}</CardTitle>
                      <CardDescription className="mt-1">{project.description}</CardDescription>
                    </div>
                  </div>
                  <Badge className={getLevelColor(project.level)}>{project.level}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Estatísticas */}
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{project.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span>{project.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{project.students}</span>
                  </div>
                </div>

                {/* Tecnologias */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="text-xs bg-green-50 text-green-700 border-green-200"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>

                {/* Preview do Código */}
                <div className="bg-gray-900 text-green-400 p-3 rounded-lg font-mono text-xs overflow-x-auto">
                  <pre className="whitespace-pre-wrap">{project.preview.substring(0, 400)}...</pre>
                </div>

                {/* Botões */}
                <div className="flex space-x-2">
                  <Button className="flex-1 bg-green-600 hover:bg-green-700">
                    <Play className="h-4 w-4 mr-2" />
                    Começar Projeto
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-green-200 text-green-700 hover:bg-green-50 bg-transparent"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Nenhum projeto encontrado</h3>
            <p className="text-gray-600">Tente ajustar os filtros ou termos de pesquisa</p>
          </div>
        )}
      </div>
    </div>
  )
}
