import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center py-16">
      <Container size="sm" className="text-center">
        <span className="text-cobalto font-bold text-sm tracking-wider uppercase mb-2 block">
          Erro 404
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-marinho mb-4">
          Página não encontrada
        </h1>
        <p className="text-marinho/70 mb-8 max-w-md mx-auto">
          Desculpe, o conteúdo que você procura não existe ou foi movido. Retorne à página inicial para continuar navegando.
        </p>
        <Button href="/" variant="primary" size="md">
          Voltar para o início
        </Button>
      </Container>
    </div>
  );
}
