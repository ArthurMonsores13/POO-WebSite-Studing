"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Play, Copy, Check } from "lucide-react"
import Link from "next/link"

export default function ClassesObjetosPage() {
  const [activeExample, setActiveExample] = useState(0)
  const [userCode, setUserCode] = useState("")
  const [output, setOutput] = useState("")
  const [copied, setCopied] = useState(false)

  const examples = [
    {
      title: "Primeira Classe",
      description: "Criando uma classe simples em Python",
      code: `# Definindo uma classe
class Pessoa:
    def __init__(self, nome, idade):
        """Construtor da classe - método especial"""
        self.nome = nome  # Atributo de instância
        self.idade = idade
        
    def apresentar(self):
        """Método da classe"""
        return f"Olá, eu sou {self.nome} e tenho {self.idade} anos"
    
    def fazer_aniversario(self):
        """Método que modifica o estado do objeto"""
        self.idade += 1
        return f"Parabéns! Agora tenho {self.idade} anos"

# Criando objetos (instâncias)
pessoa1 = Pessoa("Ana", 25)
pessoa2 = Pessoa("Carlos", 30)

# Usando os métodos
print(pessoa1.apresentar())
print(pessoa2.apresentar())

# Modificando o estado
print(pessoa1.fazer_aniversario())
print(f"Nome: {pessoa1.nome}, Idade: {pessoa1.idade}")`,
      explanation:
        "Em Python, classes são definidas com 'class'. O método __init__ é o construtor. 'self' refere-se à instância atual do objeto.",
    },
    {
      title: "Atributos de Classe vs Instância",
      description: "Diferença entre atributos compartilhados e individuais",
      code: `class Contador:
    # Atributo de classe (compartilhado por todas as instâncias)
    total_objetos = 0
    
    def __init__(self, nome):
        # Atributos de instância (únicos para cada objeto)
        self.nome = nome
        self.contador_individual = 0
        
        # Incrementa o contador de classe
        Contador.total_objetos += 1
    
    def incrementar(self):
        """Incrementa apenas o contador individual"""
        self.contador_individual += 1
    
    @classmethod
    def get_total_objetos(cls):
        """Método de classe - acessa atributos de classe"""
        return cls.total_objetos
    
    @staticmethod
    def info():
        """Método estático - não acessa self nem cls"""
        return "Esta é uma classe Contador"
    
    def __str__(self):
        """Método especial para representação em string"""
        return f"Contador {self.nome}: {self.contador_individual}"

# Testando
c1 = Contador("Primeiro")
c2 = Contador("Segundo")
c3 = Contador("Terceiro")

print(f"Total de objetos: {Contador.get_total_objetos()}")
print(f"Info: {Contador.info()}")

c1.incrementar()
c1.incrementar()
c2.incrementar()

print(c1)  # Chama __str__
print(c2)
print(f"Total: {Contador.total_objetos}")`,
      explanation:
        "Atributos de classe são compartilhados, atributos de instância são únicos. Métodos de classe usam @classmethod, estáticos usam @staticmethod.",
    },
    {
      title: "Métodos Especiais (Dunder Methods)",
      description: "Métodos mágicos que definem comportamentos especiais",
      code: `class ContaBancaria:
    def __init__(self, titular, saldo_inicial=0):
        self.titular = titular
        self.saldo = saldo_inicial
        self.historico = []
    
    def depositar(self, valor):
        if valor > 0:
            self.saldo += valor
            self.historico.append(f"Depósito: +R$ {valor:.2f}")
            return True
        return False
    
    def sacar(self, valor):
        if 0 < valor <= self.saldo:
            self.saldo -= valor
            self.historico.append(f"Saque: -R$ {valor:.2f}")
            return True
        return False
    
    # Métodos especiais
    def __str__(self):
        """Representação legível para humanos"""
        return f"Conta de {self.titular}: R$ {self.saldo:.2f}"
    
    def __repr__(self):
        """Representação técnica para desenvolvedores"""
        return f"ContaBancaria('{self.titular}', {self.saldo})"
    
    def __len__(self):
        """Permite usar len() na conta"""
        return len(self.historico)
    
    def __bool__(self):
        """Define quando a conta é True/False"""
        return self.saldo > 0
    
    def __add__(self, other):
        """Permite somar contas com +"""
        if isinstance(other, ContaBancaria):
            novo_saldo = self.saldo + other.saldo
            return ContaBancaria(f"{self.titular} + {other.titular}", novo_saldo)
        return NotImplemented
    
    def __eq__(self, other):
        """Define igualdade entre contas"""
        if isinstance(other, ContaBancaria):
            return self.saldo == other.saldo
        return False

# Testando métodos especiais
conta1 = ContaBancaria("João", 1000)
conta2 = ContaBancaria("Maria", 500)

print(str(conta1))  # __str__
print(repr(conta1))  # __repr__

conta1.depositar(200)
conta1.sacar(50)

print(f"Histórico tem {len(conta1)} transações")  # __len__
print(f"Conta ativa: {bool(conta1)}")  # __bool__

conta3 = conta1 + conta2  # __add__
print(conta3)

print(f"Contas iguais: {conta1 == conta2}")  # __eq__`,
      explanation:
        "Métodos especiais (dunder methods) permitem que objetos se comportem como tipos built-in, definindo operações como +, ==, len(), etc.",
    },
  ]

  const copyCode = () => {
    navigator.clipboard.writeText(examples[activeExample].code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const runCode = () => {
    setOutput(
      "Código Python executado com sucesso!\n\n# Exemplo de saída:\nOlá, eu sou Ana e tenho 25 anos\nOlá, eu sou Carlos e tenho 30 anos\nParabéns! Agora tenho 26 anos\nNome: Ana, Idade: 26",
    )
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
            <div className="text-2xl">🏗️</div>
            <h1 className="text-2xl font-bold text-gray-900">Classes e Objetos</h1>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              Fundamental
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Conteúdo */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Fundamentos de Classes em Python</CardTitle>
                <CardDescription>Aprenda a criar e usar classes e objetos em Python</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs
                  value={activeExample.toString()}
                  onValueChange={(value) => setActiveExample(Number.parseInt(value))}
                >
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="0">Básico</TabsTrigger>
                    <TabsTrigger value="1">Atributos</TabsTrigger>
                    <TabsTrigger value="2">Métodos Especiais</TabsTrigger>
                  </TabsList>

                  {examples.map((example, index) => (
                    <TabsContent key={index} value={index.toString()} className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold mb-2">{example.title}</h3>
                        <p className="text-gray-600 mb-4">{example.description}</p>
                        <p className="text-sm text-gray-700 mb-4">{example.explanation}</p>
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>

            {/* Conceitos Importantes */}
            <Card>
              <CardHeader>
                <CardTitle>Conceitos Importantes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-green-700">🐍 self</h4>
                  <p className="text-sm text-gray-600">Referência à instância atual do objeto</p>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-700">🏗️ __init__</h4>
                  <p className="text-sm text-gray-600">Construtor da classe, inicializa objetos</p>
                </div>
                <div>
                  <h4 className="font-semibold text-purple-700">⚡ Métodos Especiais</h4>
                  <p className="text-sm text-gray-600">__str__, __repr__, __len__ definem comportamentos</p>
                </div>
                <div>
                  <h4 className="font-semibold text-orange-700">🔧 Atributos</h4>
                  <p className="text-sm text-gray-600">De classe (compartilhados) vs de instância (únicos)</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Editor de Código */}
          <div className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Editor Python</CardTitle>
                  <CardDescription>Experimente o código aqui</CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={copyCode}>
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                  <Button size="sm" onClick={runCode} className="bg-green-600 hover:bg-green-700">
                    <Play className="h-4 w-4 mr-2" />
                    Executar
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto max-h-80 overflow-y-auto">
                  <pre>{examples[activeExample].code}</pre>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Seu Código Python:</label>
                  <Textarea
                    placeholder="# Escreva seu código Python aqui...
class MinhaClasse:
    def __init__(self):
        pass"
                    value={userCode}
                    onChange={(e) => setUserCode(e.target.value)}
                    className="font-mono text-sm min-h-[200px]"
                  />
                </div>

                {output && (
                  <div>
                    <label className="text-sm font-medium mb-2 block">Saída:</label>
                    <div className="bg-black text-green-400 p-3 rounded font-mono text-sm whitespace-pre-wrap">
                      {output}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Dicas Python */}
            <Card>
              <CardHeader>
                <CardTitle>Dicas Python</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-800">💡 PEP 8</h4>
                  <p className="text-sm text-green-700">Use snake_case para métodos e atributos</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-800">🔍 Docstrings</h4>
                  <p className="text-sm text-blue-700">Documente suas classes e métodos</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <h4 className="font-semibold text-purple-800">⚡ Properties</h4>
                  <p className="text-sm text-purple-700">Use @property para getters/setters pythônicos</p>
                </div>
              </CardContent>
            </Card>

            {/* Próximos Passos */}
            <Card>
              <CardHeader>
                <CardTitle>Próximos Passos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/conceitos/encapsulamento">
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent border-blue-200 hover:bg-blue-50"
                  >
                    🔒 Encapsulamento →
                  </Button>
                </Link>
                <Link href="/conceitos/heranca">
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent border-purple-200 hover:bg-purple-50"
                  >
                    🧬 Herança →
                  </Button>
                </Link>
                <Link href="/projetos">
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent border-green-200 hover:bg-green-50"
                  >
                    🚀 Ver Projetos →
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
