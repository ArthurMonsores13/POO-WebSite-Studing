"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Copy, Check } from "lucide-react"
import Link from "next/link"

export default function EncapsulamentoPage() {
  const [activeExample, setActiveExample] = useState(0)
  const [copied, setCopied] = useState(false)

  const examples = [
    {
      title: "Atributos Privados",
      description: "Protegendo dados com convenções Python",
      code: `class ContaBancaria:
    def __init__(self, titular, saldo_inicial=0):
        self.titular = titular  # Público
        self._numero_conta = self._gerar_numero()  # Protegido (convenção)
        self.__saldo = saldo_inicial  # Privado (name mangling)
        self.__historico = []  # Privado
    
    def _gerar_numero(self):
        """Método protegido - uso interno da classe"""
        import random
        return f"{random.randint(10000, 99999)}-{random.randint(1, 9)}"
    
    def depositar(self, valor):
        """Método público para depositar"""
        if valor > 0:
            self.__saldo += valor
            self.__historico.append(f"Depósito: +R$ {valor:.2f}")
            print(f"Depósito realizado. Saldo atual: R$ {self.__saldo:.2f}")
            return True
        else:
            print("Valor inválido para depósito")
            return False
    
    def sacar(self, valor):
        """Método público para sacar"""
        if valor > 0 and valor <= self.__saldo:
            self.__saldo -= valor
            self.__historico.append(f"Saque: -R$ {valor:.2f}")
            print(f"Saque realizado. Saldo atual: R$ {self.__saldo:.2f}")
            return True
        else:
            print("Saque não autorizado")
            return False
    
    def get_saldo(self):
        """Getter para saldo - acesso controlado"""
        return self.__saldo
    
    def get_historico(self):
        """Getter para histórico - retorna cópia"""
        return self.__historico.copy()
    
    def __str__(self):
        return f"Conta {self._numero_conta} - {self.titular}: R$ {self.__saldo:.2f}"

# Testando encapsulamento
conta = ContaBancaria("Maria Silva", 1000)
print(conta)

# Acesso público - OK
print(f"Titular: {conta.titular}")

# Acesso protegido - possível mas não recomendado
print(f"Número da conta: {conta._numero_conta}")

# Acesso privado - através de métodos públicos
print(f"Saldo: R$ {conta.get_saldo():.2f}")

# Tentativa de acesso direto ao atributo privado
# print(conta.__saldo)  # Erro! AttributeError

# Mas ainda é possível acessar via name mangling (não recomendado!)
# print(conta._ContaBancaria__saldo)  # Funciona mas quebra encapsulamento`,
      explanation:
        "Python usa convenções: _ para protegido, __ para privado (name mangling). Encapsulamento protege dados e controla acesso.",
    },
    {
      title: "Properties - Getters e Setters Pythônicos",
      description: "Usando @property para acesso controlado",
      code: `class Temperatura:
    def __init__(self, celsius=0):
        self._celsius = celsius
    
    @property
    def celsius(self):
        """Getter para celsius"""
        return self._celsius
    
    @celsius.setter
    def celsius(self, valor):
        """Setter para celsius com validação"""
        if valor < -273.15:
            raise ValueError("Temperatura não pode ser menor que -273.15°C")
        self._celsius = valor
    
    @property
    def fahrenheit(self):
        """Propriedade calculada - Fahrenheit"""
        return (self._celsius * 9/5) + 32
    
    @fahrenheit.setter
    def fahrenheit(self, valor):
        """Setter para Fahrenheit - converte para Celsius"""
        if valor < -459.67:
            raise ValueError("Temperatura não pode ser menor que -459.67°F")
        self._celsius = (valor - 32) * 5/9
    
    @property
    def kelvin(self):
        """Propriedade calculada - Kelvin"""
        return self._celsius + 273.15
    
    @kelvin.setter
    def kelvin(self, valor):
        """Setter para Kelvin - converte para Celsius"""
        if valor < 0:
            raise ValueError("Temperatura não pode ser menor que 0K")
        self._celsius = valor - 273.15
    
    def __str__(self):
        return f"{self._celsius:.2f}°C ({self.fahrenheit:.2f}°F, {self.kelvin:.2f}K)"

# Exemplo de uso
temp = Temperatura(25)
print(f"Temperatura inicial: {temp}")

# Usando properties como atributos
temp.celsius = 30
print(f"Após alterar Celsius: {temp}")

temp.fahrenheit = 100
print(f"Após alterar Fahrenheit: {temp}")

temp.kelvin = 300
print(f"Após alterar Kelvin: {temp}")

# Validação automática
try:
    temp.celsius = -300  # Erro!
except ValueError as e:
    print(f"Erro: {e}")

class Pessoa:
    def __init__(self, nome, idade):
        self._nome = nome
        self._idade = idade
    
    @property
    def nome(self):
        return self._nome
    
    @nome.setter
    def nome(self, valor):
        if not isinstance(valor, str) or len(valor.strip()) == 0:
            raise ValueError("Nome deve ser uma string não vazia")
        self._nome = valor.strip().title()
    
    @property
    def idade(self):
        return self._idade
    
    @idade.setter
    def idade(self, valor):
        if not isinstance(valor, int) or valor < 0 or valor > 150:
            raise ValueError("Idade deve ser um número entre 0 e 150")
        self._idade = valor
    
    @property
    def eh_maior_idade(self):
        """Propriedade somente leitura"""
        return self._idade >= 18
    
    def __str__(self):
        status = "maior" if self.eh_maior_idade else "menor"
        return f"{self._nome}, {self._idade} anos ({status} de idade)"`,
      explanation:
        "@property transforma métodos em atributos, permitindo validação e cálculos automáticos. É a forma pythônica de fazer getters/setters.",
    },
    {
      title: "Validação e Controle de Acesso",
      description: "Implementando validações robustas",
      code: `from datetime import datetime, date
import re

class Usuario:
    def __init__(self, email, senha, nome):
        # Usar setters para validação inicial
        self.email = email
        self.senha = senha
        self.nome = nome
        self._data_criacao = datetime.now()
        self._ativo = True
        self._tentativas_login = 0
        self._bloqueado = False
    
    @property
    def email(self):
        return self._email
    
    @email.setter
    def email(self, valor):
        """Validação de email"""
        if not isinstance(valor, str):
            raise TypeError("Email deve ser uma string")
        
        # Regex simples para validação de email
        padrao = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        if not re.match(padrao, valor):
            raise ValueError("Email inválido")
        
        self._email = valor.lower()
    
    @property
    def senha(self):
        # Nunca retornar a senha real
        return "*" * len(self._senha)
    
    @senha.setter
    def senha(self, valor):
        """Validação de senha forte"""
        if not isinstance(valor, str):
            raise TypeError("Senha deve ser uma string")
        
        if len(valor) < 8:
            raise ValueError("Senha deve ter pelo menos 8 caracteres")
        
        if not re.search(r'[A-Z]', valor):
            raise ValueError("Senha deve ter pelo menos uma letra maiúscula")
        
        if not re.search(r'[a-z]', valor):
            raise ValueError("Senha deve ter pelo menos uma letra minúscula")
        
        if not re.search(r'\d', valor):
            raise ValueError("Senha deve ter pelo menos um número")
        
        if not re.search(r'[!@#$%^&*(),.?":{}|<>]', valor):
            raise ValueError("Senha deve ter pelo menos um caractere especial")
        
        # Em um sistema real, você faria hash da senha
        import hashlib
        self._senha = hashlib.sha256(valor.encode()).hexdigest()
    
    @property
    def nome(self):
        return self._nome
    
    @nome.setter
    def nome(self, valor):
        """Validação de nome"""
        if not isinstance(valor, str):
            raise TypeError("Nome deve ser uma string")
        
        valor = valor.strip()
        if len(valor) < 2:
            raise ValueError("Nome deve ter pelo menos 2 caracteres")
        
        if not re.match(r'^[a-zA-ZÀ-ÿ\s]+$', valor):
            raise ValueError("Nome deve conter apenas letras e espaços")
        
        self._nome = valor.title()
    
    @property
    def ativo(self):
        return self._ativo and not self._bloqueado
    
    def verificar_senha(self, senha):
        """Verifica senha com controle de tentativas"""
        if self._bloqueado:
            raise ValueError("Usuário bloqueado por muitas tentativas")
        
        senha_hash = hashlib.sha256(senha.encode()).hexdigest()
        if senha_hash == self._senha:
            self._tentativas_login = 0  # Reset tentativas
            return True
        else:
            self._tentativas_login += 1
            if self._tentativas_login >= 3:
                self._bloqueado = True
                raise ValueError("Usuário bloqueado após 3 tentativas")
            return False
    
    def desbloquear(self):
        """Método para administrador desbloquear usuário"""
        self._bloqueado = False
        self._tentativas_login = 0
    
    @property
    def info_publica(self):
        """Retorna apenas informações públicas"""
        return {
            'nome': self._nome,
            'email': self._email,
            'ativo': self.ativo,
            'data_criacao': self._data_criacao.strftime('%d/%m/%Y')
        }
    
    def __str__(self):
        status = "Ativo" if self.ativo else "Inativo"
        return f"{self._nome} ({self._email}) - {status}"

# Exemplo de uso com tratamento de erros
try:
    usuario = Usuario("joao@email.com", "MinhaSenh@123", "João Silva")
    print(f"Usuário criado: {usuario}")
    print(f"Info pública: {usuario.info_publica}")
    
    # Tentativa de login
    if usuario.verificar_senha("MinhaSenh@123"):
        print("Login realizado com sucesso!")
    
except ValueError as e:
    print(f"Erro de validação: {e}")
except TypeError as e:
    print(f"Erro de tipo: {e}")`,
      explanation:
        "Validação robusta protege a integridade dos dados. Properties permitem controle total sobre como os dados são acessados e modificados.",
    },
  ]

  const copyCode = () => {
    navigator.clipboard.writeText(examples[activeExample].code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
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
            <div className="text-2xl">🔒</div>
            <h1 className="text-2xl font-bold text-gray-900">Encapsulamento</h1>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              Intermediário
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
                <CardTitle>Encapsulamento em Python</CardTitle>
                <CardDescription>Proteja seus dados e controle o acesso com encapsulamento</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs
                  value={activeExample.toString()}
                  onValueChange={(value) => setActiveExample(Number.parseInt(value))}
                >
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="0">Privacidade</TabsTrigger>
                    <TabsTrigger value="1">Properties</TabsTrigger>
                    <TabsTrigger value="2">Validação</TabsTrigger>
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
                <CardTitle>Níveis de Acesso em Python</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-green-700">✅ Público (nome)</h4>
                  <p className="text-sm text-gray-600">Acesso livre de qualquer lugar</p>
                </div>
                <div>
                  <h4 className="font-semibold text-yellow-700">⚠️ Protegido (_nome)</h4>
                  <p className="text-sm text-gray-600">Convenção: uso interno da classe e subclasses</p>
                </div>
                <div>
                  <h4 className="font-semibold text-red-700">🔒 Privado (__nome)</h4>
                  <p className="text-sm text-gray-600">Name mangling: acesso muito restrito</p>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-700">🎯 @property</h4>
                  <p className="text-sm text-gray-600">Acesso controlado com validação</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Editor de Código */}
          <div className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Exemplo de Código</CardTitle>
                  <CardDescription>Veja encapsulamento na prática</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={copyCode}>
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto max-h-96 overflow-y-auto">
                  <pre>{examples[activeExample].code}</pre>
                </div>
              </CardContent>
            </Card>

            {/* Boas Práticas */}
            <Card>
              <CardHeader>
                <CardTitle>Boas Práticas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-800">✅ Use @property</h4>
                  <p className="text-sm text-green-700">Para getters/setters com validação</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-800">🔍 Valide dados</h4>
                  <p className="text-sm text-blue-700">Sempre valide entradas nos setters</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <h4 className="font-semibold text-purple-800">🛡️ Proteja dados sensíveis</h4>
                  <p className="text-sm text-purple-700">Use __ para dados realmente privados</p>
                </div>
              </CardContent>
            </Card>

            {/* Próximos Passos */}
            <Card>
              <CardHeader>
                <CardTitle>Continue Aprendendo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/conceitos/heranca">
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent border-purple-200 hover:bg-purple-50"
                  >
                    🧬 Herança →
                  </Button>
                </Link>
                <Link href="/conceitos/polimorfismo">
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent border-orange-200 hover:bg-orange-50"
                  >
                    🔄 Polimorfismo →
                  </Button>
                </Link>
                <Link href="/projetos">
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent border-green-200 hover:bg-green-50"
                  >
                    🚀 Projetos Práticos →
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
