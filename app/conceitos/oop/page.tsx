"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Copy, Check } from "lucide-react"
import Link from "next/link"

export default function OOPPage() {
  const [activeExample, setActiveExample] = useState(0)
  const [copied, setCopied] = useState(false)

  const examples = [
    {
      title: "Classes e Objetos",
      description: "Criando sua primeira classe",
      code: `// Definindo uma classe
public class Pessoa {
    // Atributos (características)
    private String nome;
    private int idade;
    private String email;
    
    // Construtor
    public Pessoa(String nome, int idade, String email) {
        this.nome = nome;
        this.idade = idade;
        this.email = email;
    }
    
    // Métodos (comportamentos)
    public void apresentar() {
        System.out.println("Olá, eu sou " + nome + " e tenho " + idade + " anos.");
    }
    
    public void fazerAniversario() {
        idade++;
        System.out.println("Parabéns! Agora tenho " + idade + " anos.");
    }
    
    // Getters e Setters
    public String getNome() { return nome; }
    public int getIdade() { return idade; }
    public String getEmail() { return email; }
    
    public void setEmail(String email) { this.email = email; }
}

// Usando a classe
public class Main {
    public static void main(String[] args) {
        // Criando objetos (instâncias da classe)
        Pessoa pessoa1 = new Pessoa("João", 25, "joao@email.com");
        Pessoa pessoa2 = new Pessoa("Maria", 30, "maria@email.com");
        
        // Usando os métodos
        pessoa1.apresentar();
        pessoa2.apresentar();
        
        pessoa1.fazerAniversario();
    }
}`,
      explanation:
        "Classes são moldes para criar objetos. Objetos são instâncias de classes que possuem atributos (dados) e métodos (comportamentos).",
    },
    {
      title: "Encapsulamento",
      description: "Protegendo dados com modificadores de acesso",
      code: `public class ContaBancaria {
    // Atributos privados (encapsulados)
    private String titular;
    private double saldo;
    private String numeroConta;
    
    public ContaBancaria(String titular, String numeroConta) {
        this.titular = titular;
        this.numeroConta = numeroConta;
        this.saldo = 0.0;
    }
    
    // Método público para depositar
    public void depositar(double valor) {
        if (valor > 0) {
            saldo += valor;
            System.out.println("Depósito realizado. Saldo atual: R$ " + saldo);
        } else {
            System.out.println("Valor inválido para depósito.");
        }
    }
    
    // Método público para sacar
    public boolean sacar(double valor) {
        if (valor > 0 && valor <= saldo) {
            saldo -= valor;
            System.out.println("Saque realizado. Saldo atual: R$ " + saldo);
            return true;
        } else {
            System.out.println("Saque não autorizado.");
            return false;
        }
    }
    
    // Getter para saldo (somente leitura)
    public double getSaldo() {
        return saldo;
    }
    
    public String getTitular() {
        return titular;
    }
    
    public String getNumeroConta() {
        return numeroConta;
    }
}`,
      explanation:
        "Encapsulamento protege os dados internos da classe, permitindo acesso controlado através de métodos públicos.",
    },
    {
      title: "Herança",
      description: "Reutilizando código com herança",
      code: `// Classe pai (superclasse)
public class Veiculo {
    protected String marca;
    protected String modelo;
    protected int ano;
    
    public Veiculo(String marca, String modelo, int ano) {
        this.marca = marca;
        this.modelo = modelo;
        this.ano = ano;
    }
    
    public void acelerar() {
        System.out.println("O veículo está acelerando...");
    }
    
    public void frear() {
        System.out.println("O veículo está freando...");
    }
    
    public void mostrarInfo() {
        System.out.println(marca + " " + modelo + " (" + ano + ")");
    }
}

// Classe filha (subclasse)
public class Carro extends Veiculo {
    private int numeroPortas;
    
    public Carro(String marca, String modelo, int ano, int numeroPortas) {
        super(marca, modelo, ano); // Chama o construtor da classe pai
        this.numeroPortas = numeroPortas;
    }
    
    // Sobrescrevendo método da classe pai
    @Override
    public void acelerar() {
        System.out.println("O carro está acelerando suavemente...");
    }
    
    // Método específico da classe Carro
    public void ligarArCondicionado() {
        System.out.println("Ar condicionado ligado!");
    }
    
    @Override
    public void mostrarInfo() {
        super.mostrarInfo();
        System.out.println("Número de portas: " + numeroPortas);
    }
}

// Outra classe filha
public class Moto extends Veiculo {
    private boolean temBau;
    
    public Moto(String marca, String modelo, int ano, boolean temBau) {
        super(marca, modelo, ano);
        this.temBau = temBau;
    }
    
    @Override
    public void acelerar() {
        System.out.println("A moto está acelerando rapidamente!");
    }
    
    public void empinar() {
        System.out.println("Empinando a moto!");
    }
}`,
      explanation:
        "Herança permite criar novas classes baseadas em classes existentes, reutilizando código e criando hierarquias.",
    },
    {
      title: "Polimorfismo",
      description: "Um método, múltiplos comportamentos",
      code: `// Interface para definir comportamento comum
interface Animal {
    void emitirSom();
    void mover();
}

// Implementações diferentes da interface
public class Cachorro implements Animal {
    private String nome;
    
    public Cachorro(String nome) {
        this.nome = nome;
    }
    
    @Override
    public void emitirSom() {
        System.out.println(nome + " faz: Au au!");
    }
    
    @Override
    public void mover() {
        System.out.println(nome + " está correndo!");
    }
}

public class Gato implements Animal {
    private String nome;
    
    public Gato(String nome) {
        this.nome = nome;
    }
    
    @Override
    public void emitirSom() {
        System.out.println(nome + " faz: Miau!");
    }
    
    @Override
    public void mover() {
        System.out.println(nome + " está caminhando silenciosamente!");
    }
}

public class Passaro implements Animal {
    private String nome;
    
    public Passaro(String nome) {
        this.nome = nome;
    }
    
    @Override
    public void emitirSom() {
        System.out.println(nome + " faz: Piu piu!");
    }
    
    @Override
    public void mover() {
        System.out.println(nome + " está voando!");
    }
}

// Demonstrando polimorfismo
public class ZooSimulador {
    public static void main(String[] args) {
        // Array de animais (polimorfismo)
        Animal[] animais = {
            new Cachorro("Rex"),
            new Gato("Mimi"),
            new Passaro("Piu"),
            new Cachorro("Bolt")
        };
        
        // Cada animal se comporta de forma diferente
        for (Animal animal : animais) {
            animal.emitirSom(); // Polimorfismo em ação!
            animal.mover();
            System.out.println("---");
        }
    }
}`,
      explanation:
        "Polimorfismo permite que objetos de diferentes classes sejam tratados de forma uniforme através de uma interface comum.",
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
            <h1 className="text-2xl font-bold text-gray-900">Orientação a Objetos</h1>
            <Badge variant="secondary">Intermediário</Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Conteúdo */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Os 4 Pilares da POO</CardTitle>
                <CardDescription>Aprenda os conceitos fundamentais da Programação Orientada a Objetos</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs
                  value={activeExample.toString()}
                  onValueChange={(value) => setActiveExample(Number.parseInt(value))}
                >
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="0">Classes</TabsTrigger>
                    <TabsTrigger value="1">Encapsulamento</TabsTrigger>
                  </TabsList>
                  <TabsList className="grid w-full grid-cols-2 mt-2">
                    <TabsTrigger value="2">Herança</TabsTrigger>
                    <TabsTrigger value="3">Polimorfismo</TabsTrigger>
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
                <CardTitle>Vantagens da POO</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-blue-700">🔒 Encapsulamento</h4>
                  <p className="text-sm text-gray-600">Protege dados e controla o acesso</p>
                </div>
                <div>
                  <h4 className="font-semibold text-green-700">♻️ Reutilização</h4>
                  <p className="text-sm text-gray-600">Herança permite reutilizar código</p>
                </div>
                <div>
                  <h4 className="font-semibold text-purple-700">🔄 Polimorfismo</h4>
                  <p className="text-sm text-gray-600">Flexibilidade no comportamento dos objetos</p>
                </div>
                <div>
                  <h4 className="font-semibold text-orange-700">📦 Modularidade</h4>
                  <p className="text-sm text-gray-600">Código organizado em classes e pacotes</p>
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
                  <CardDescription>Veja como implementar na prática</CardDescription>
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

            {/* Exercícios Práticos */}
            <Card>
              <CardHeader>
                <CardTitle>Exercícios Práticos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-800">Exercício 1</h4>
                  <p className="text-sm text-blue-700">Crie uma classe "Produto" com nome, preço e categoria</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-800">Exercício 2</h4>
                  <p className="text-sm text-green-700">Implemente herança: "Funcionario" → "Gerente", "Vendedor"</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <h4 className="font-semibold text-purple-800">Exercício 3</h4>
                  <p className="text-sm text-purple-700">
                    Use polimorfismo com interface "Forma" → "Círculo", "Retângulo"
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Próximos Passos */}
            <Card>
              <CardHeader>
                <CardTitle>Continue Aprendendo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/conceitos/collections">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    Collections Framework →
                  </Button>
                </Link>
                <Link href="/conceitos/avancado">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    Tópicos Avançados →
                  </Button>
                </Link>
                <Link href="/projetos">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    Projetos com POO →
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
