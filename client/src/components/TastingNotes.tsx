interface TastingNotesProps {
  aroma: string[];
  palate: string[];
  finish: string[];
}

export default function TastingNotes({
  aroma,
  palate,
  finish,
}: TastingNotesProps) {
  const renderNoteCard = (title: string, notes: string[]) => (
    <div className="bg-card rounded-lg p-6 border border-border">
      <h4 className="text-sm font-bold text-foreground uppercase tracking-wide mb-4">
        {title}
      </h4>
      <div className="flex flex-wrap gap-2">
        {notes.map((note, idx) => (
          <span
            key={idx}
            className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm font-medium capitalize"
          >
            {note}
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-foreground mb-6">
          Notas de Cata
        </h3>
        <p className="text-muted-foreground mb-6">
          Descubre los matices y características sensoriales de este aceite a través de nuestro análisis detallado.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {renderNoteCard("Aroma", aroma)}
        {renderNoteCard("Paladar", palate)}
        {renderNoteCard("Final", finish)}
      </div>
    </div>
  );
}
