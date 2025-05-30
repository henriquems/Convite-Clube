export function formatDateTimeBR(date?: Date | string | null): string {
    if (!date) return '';

    const data = date instanceof Date ? date : new Date(date);

    return data.toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    });
}