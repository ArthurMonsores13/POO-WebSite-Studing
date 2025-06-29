"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Play, Copy, Check } from "lucide-react"
import Link from "next/link"

export default function JavaBasicoPage() {
  const [activeExample, setActiveExample] = useState(0)
  const [userCode, setUserCode] = useState("")
  const [output, setOutput] = useState("")
  const [copied, setCopied] = useState(false)

  const examples = [
    {
      title: "Hello World",
      description: "Seu primeiro programa em Java",
      code: `public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Olá, Mundo!");
    }
}`,
      explanation:
        "Este é o programa mais básico em Java. A classe HelloWorld contém o método main, que é o ponto de entrada do programa.",
    },
    {
      title: "Variáveis e Tipos",
      description: "Declarando e usando variáveis",
      code: `public class Variaveis {
    public static void main(String[] args) {
        // Tipos primitivos
        int idade = 25;
        double altura = 1.75;
        boolean ativo = true;
        char inicial = 'J';
        
        // String (tipo de referência)
        String nome = "João";
        
        System.out.println("Nome: " + nome);
        System.out.println("Idade: " + idade);
        System.out.println("Altura: " + altura);
        System.out.println("Ativo: " + ativo);
        System.out.println("Inicial: " + inicial);
    }
}`,
      explanation:
        "Java possui tipos primitivos (int, double, boolean, char) e tipos de referência (String, objetos). Cada tipo tem seu propósito específico.",
    },
    {
      title: "Estruturas Condicionais",
      description: "If, else e switch",
      code: `public class Condicionais {
    public static void main(String[] args) {
        int nota = 85;
        
        // If-else
        if (nota >= 90) {
            System.out.println("Excelente!");
        } else if (nota >= 70) {
            System.out.println("Bom!");
        } else {
            System.out.println("Precisa melhorar");
        }
        
        // Switch
        int dia = 3;
        switch (dia) {
            case 1:
                System.out.println("Segunda-feira");
                break;
            case 2:
                System.out.println("Terça-feira");
                break;
            case 3:
                System.out.println("Quarta-feira");
                break;
            default:
                System.out.println("Outro dia");
        }
    }
}`,
      explanation:
        "Estruturas condicionais permitem que o programa tome decisões baseadas em condições. Use if-else para condições complexas e switch para valores específicos.",
    },
  ]

  const copyCode = () => {
    navigator.clipboard.writeText(examples[activeExample].code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const runCode = () => {
    // Simulação de execução (em um ambiente real, você enviaria para um servidor)
    setOutput("Código executado com sucesso!\n(Em um ambiente real, este código seria compilado e executado)")
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
            <h1 className="text-2xl font-bold text-gray-900">Java Básico</h1>
            <Badge variant="secondary">Iniciante</Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Conteúdo */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Fundamentos do Java</CardTitle>
                <CardDescription>Aprenda os conceitos básicos da linguagem Java com exemplos práticos</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs
                  value={activeExample.toString()}
                  onValueChange={(value) => setActiveExample(Number.parseInt(value))}
                >
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="0">Hello World</TabsTrigger>
                    <TabsTrigger value="1">Variáveis</TabsTrigger>
                    <TabsTrigger value="2">Condicionais</TabsTrigger>
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
                  <h4 className="font-semibold text-green-700">✓ Sintaxe Clara</h4>
                  <p className="text-sm text-gray-600">Java tem uma sintaxe clara e estruturada, similar ao C++</p>
                </div>
                <div>
                  <h4 className="font-semibold text-green-700">✓ Tipagem Estática</h4>
                  <p className="text-sm text-gray-600">Todas as variáveis devem ter um tipo definido</p>
                </div>
                <div>
                  <h4 className="font-semibold text-green-700">✓ Case Sensitive</h4>
                  <p className="text-sm text-gray-600">Java diferencia maiúsculas de minúsculas</p>
                </div>
                <div>
                  <h4 className="font-semibold text-green-700">✓ Orientado a Objetos</h4>
                  <p className="text-sm text-gray-600">Tudo em Java é baseado em classes e objetos</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Editor de Código */}
          <div className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Editor de Código</CardTitle>
                  <CardDescription>Experimente o código aqui</CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={copyCode}>
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                  <Button size="sm" onClick={runCode}>
                    <Play className="h-4 w-4 mr-2" />
                    Executar
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                  <pre>{examples[activeExample].code}</pre>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Seu Código:</label>
                  <Textarea
                    placeholder="Escreva seu código Java aqui..."
                    value={userCode}
                    onChange={(e) => setUserCode(e.target.value)}
                    className="font-mono text-sm min-h-[200px]"
                  />
                </div>

                {output && (
                  <div>
                    <label className="text-sm font-medium mb-2 block">Saída:</label>
                    <div className="bg-black text-green-400 p-3 rounded font-mono text-sm">{output}</div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Próximos Passos */}
            <Card>
              <CardHeader>
                <CardTitle>Próximos Passos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/conceitos/oop">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    Orientação a Objetos →
                  </Button>
                </Link>
                <Link href="/conceitos/collections">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    Collections Framework →
                  </Button>
                </Link>
                <Link href="/projetos">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    Ver Projetos Práticos →
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
