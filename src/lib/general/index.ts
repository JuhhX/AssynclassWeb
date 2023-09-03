export function resolveGrade(grade: string){

    const grades : any = {
      "ANO_6": "6° ano (Ensino Fundamental II)",
      "ANO_7": "7° ano (Ensino Fundamental II)",
      "ANO_8": "8° ano (Ensino Fundamental II)",
      "ANO_9": "9° ano (Ensino Fundamental II)",
      "ANO_1": "1° ano (Ensino Médio)",
      "ANO_2": "2° ano (Ensino Médio)",
      "ANO_3": "3° ano (Ensino Médio)",
    }

    return grades[grade];
}