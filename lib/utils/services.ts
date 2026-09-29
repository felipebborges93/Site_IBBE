import { Service } from "@/content/services";

export interface NextServiceResult {
  service: Service;
  formattedDate: string;
  isToday: boolean;
  timeUntil?: string;
}

const dayOfWeekMap: Record<string, number> = {
  domingo: 0,
  "segunda-feira": 1,
  segunda: 1,
  "terça-feira": 2,
  terca: 2,
  "quarta-feira": 3,
  quarta: 3,
  "quinta-feira": 4,
  quinta: 4,
  "sexta-feira": 5,
  sexta: 5,
  sábado: 6,
  sabado: 6,
};

export function calculateNextService(
  serviceList: Service[],
  now = new Date()
): NextServiceResult {
  // Fallback defensivo padrão
  const defaultFallback: NextServiceResult = {
    service: {
      id: "celebracao",
      title: "Culto de Celebração",
      day: "Domingo",
      time: "19:00",
      description: "Nosso encontro congregacional com louvor e palavra.",
    },
    formattedDate: "Domingo às 19:00",
    isToday: false,
  };

  if (!serviceList || serviceList.length === 0) {
    return defaultFallback;
  }

  try {
    const currentDay = now.getDay(); // 0 a 6
    const currentHours = now.getHours();
    const currentMinutes = now.getMinutes();
    const currentTimeInMinutes = currentHours * 60 + currentMinutes;

    interface Candidate {
      service: Service;
      diffDays: number;
      diffMinutes: number;
    }

    const candidates: Candidate[] = [];

    for (const service of serviceList) {
      const normalizedDay = service.day.toLowerCase().trim();
      const targetDay = dayOfWeekMap[normalizedDay];

      if (targetDay === undefined) continue;

      const [hoursStr, minutesStr] = service.time.split(":");
      const serviceHours = parseInt(hoursStr || "0", 10);
      const serviceMinutes = parseInt(minutesStr || "0", 10);
      const serviceTimeInMinutes = serviceHours * 60 + serviceMinutes;

      // Calcular diferença de dias até o próximo evento desse culto
      let daysAhead = (targetDay - currentDay + 7) % 7;

      // Se for no mesmo dia mas o horário já passou, o próximo será na próxima semana (+7 dias)
      if (daysAhead === 0 && serviceTimeInMinutes <= currentTimeInMinutes) {
        daysAhead = 7;
      }

      const totalDiffMinutes = daysAhead * 24 * 60 + (serviceTimeInMinutes - currentTimeInMinutes);

      candidates.push({
        service,
        diffDays: daysAhead,
        diffMinutes: totalDiffMinutes,
      });
    }

    if (candidates.length === 0) {
      return defaultFallback;
    }

    // Ordenar pelo menor tempo até o culto
    candidates.sort((a, b) => a.diffMinutes - b.diffMinutes);
    const nextCandidate = candidates[0];

    let formattedDate = "";
    let isToday = false;

    if (nextCandidate.diffDays === 0) {
      formattedDate = `Hoje às ${nextCandidate.service.time}`;
      isToday = true;
    } else if (nextCandidate.diffDays === 1) {
      formattedDate = `Amanhã às ${nextCandidate.service.time}`;
    } else {
      formattedDate = `${nextCandidate.service.day} às ${nextCandidate.service.time}`;
    }

    return {
      service: nextCandidate.service,
      formattedDate,
      isToday,
    };
  } catch {
    return defaultFallback;
  }
}
