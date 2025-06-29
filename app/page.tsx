import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Code, Lightbulb, Zap } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <Code className="h-8 w-8 text-green-600" />
                <span className="text-2xl">🐍</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">PythonOOP</h1>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <Link href="#conceitos" className="text-gray-600 hover:text-green-600 transition-colors">
                Conceitos
              </Link>
              <Link href="#pratica" className="text-gray-600 hover:text-green-600 transition-colors">
                Prática
              </Link>
              <Link href="#projetos" className="text-gray-600 hover:text-green-600 transition-colors">
                Projetos
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Domine <span className="text-green-600">POO em Python</span> 🐍
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Aprenda Programação Orientada a Objetos em Python de forma prática e intuitiva. Classes, herança,
            polimorfismo e muito mais com exemplos reais!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-3 bg-green-600 hover:bg-green-700">
              <BookOpen className="mr-2 h-5 w-5" />
              Começar a Estudar
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-3 bg-transparent border-green-600 text-green-600 hover:bg-green-50"
            >
              <Zap className="mr-2 h-5 w-5" />
              Ver Projetos
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Por que aprender POO em Python?</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <BookOpen className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle>Sintaxe Simples</CardTitle>
                <CardDescription>Python torna POO mais fácil de entender com sintaxe clara e intuitiva</CardDescription>
              </CardHeader>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <Code className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Exemplos Práticos</CardTitle>
                <CardDescription>
                  Aprenda com código real que você pode executar e modificar instantaneamente
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <Lightbulb className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
                <CardTitle>Projetos Reais</CardTitle>
                <CardDescription>Construa aplicações completas usando os conceitos de POO em Python</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section id="conceitos" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Trilha de Aprendizado</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/conceitos/classes-objetos">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-green-500">
                <CardHeader>
                  <div className="text-2xl mb-2">🏗️</div>
                  <CardTitle className="text-lg">Classes e Objetos</CardTitle>
                  <CardDescription>Fundamentos: __init__, atributos, métodos</CardDescription>
                </CardHeader>
              </Card>
            </Link>
            <Link href="/conceitos/encapsulamento">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-blue-500">
                <CardHeader>
                  <div className="text-2xl mb-2">🔒</div>
                  <CardTitle className="text-lg">Encapsulamento</CardTitle>
                  <CardDescription>Atributos privados, getters, setters, properties</CardDescription>
                </CardHeader>
              </Card>
            </Link>
            <Link href="/conceitos/heranca">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-purple-500">
                <CardHeader>
                  <div className="text-2xl mb-2">🧬</div>
                  <CardTitle className="text-lg">Herança</CardTitle>
                  <CardDescription>Super(), herança múltipla, MRO</CardDescription>
                </CardHeader>
              </Card>
            </Link>
            <Link href="/conceitos/polimorfismo">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-orange-500">
                <CardHeader>
                  <div className="text-2xl mb-2">🔄</div>
                  <CardTitle className="text-lg">Polimorfismo</CardTitle>
                  <CardDescription>Duck typing, métodos abstratos, interfaces</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Python Advantages */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-8">Vantagens do Python para POO</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
              <div className="text-3xl mb-3">⚡</div>
              <h4 className="font-semibold mb-2">Sintaxe Limpa</h4>
              <p className="text-sm opacity-90">Menos código, mais produtividade</p>
            </div>
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
              <div className="text-3xl mb-3">🔧</div>
              <h4 className="font-semibold mb-2">Flexibilidade</h4>
              <p className="text-sm opacity-90">Duck typing e tipagem dinâmica</p>
            </div>
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
              <div className="text-3xl mb-3">📚</div>
              <h4 className="font-semibold mb-2">Bibliotecas</h4>
              <p className="text-sm opacity-90">Ecossistema rico e maduro</p>
            </div>
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
              <div className="text-3xl mb-3">🚀</div>
              <h4 className="font-semibold mb-2">Rapidez</h4>
              <p className="text-sm opacity-90">Desenvolvimento ágil e eficiente</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Code className="h-6 w-6" />
            <span className="text-2xl">🐍</span>
            <span className="text-xl font-bold">PythonOOP</span>
          </div>
          <p className="text-gray-400">Domine POO em Python e construa aplicações incríveis. Do básico ao avançado!</p>
        </div>
      </footer>
    </div>
  )
}
