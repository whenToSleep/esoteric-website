import { setRequestLocale } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="font-heading text-4xl font-bold">
        Esoteric
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Coming soon...
      </p>
    </main>
  );
}
