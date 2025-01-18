export const clientes = [
    {
        idCliente: 1,
        name: "Armando Matheus",
        idade: 29,
        icon: "M"
    },
    {
        idCliente: 2,
        name: "Ana Beatriz Rutini",
        idade: 37,
        icon: "F"
    },
    {
        idCliente: 3,
        name: "Antônio Almeida Souza ",
        idade: 18,
        icon: "M"
    },
    {
        idCliente: 4,
        name: "Roberta Martins",
        idade: 26,
        icon: "F"
    },
    {
        idCliente: 5,
        name: "Nise da Silveira",
        idade: 46,
        icon: "F"
    },
    {
        idCliente: 6,
        name: "Jonatan Silvestre",
        idade: 55,
        icon: "M"
    },
    {
        idCliente: 7,
        name: "José Eduardo Souza",
        idade: 40,
        icon: "M"
    },
    {
        idCliente: 8,
        name: "Adriana Melo",
        idade: 68,
        icon: "F"
    },
    {
        idCliente: 9,
        name: "Valeria Petri",
        idade: 28,
        icon: "F"
    }

];

export const appointments = [
    {
        id_appointment: 1,
        nome_procedimento: "Consulta",
        nomeDoutor: "Roberta Martins",
        especialidade: "Biomédica",
        data: "2024-12-14",
        horario: "17:30",
        nome_cliente:"Rafael Mendes da Silva",
        valor: 1500
    },
    {
        id_appointment: 2,
        nome_procedimento: "Consulta",
        nomeDoutor: "Roberta Martins",
        especialidade: "Biomédica",
        data: "2024-12-14",
        horario: "17:30",
        nome_cliente:"Rafael Mendes da Silva",
        valor: 1500
    },
    {
        id_appointment: 3,
        nome_procedimento: "Consulta",
        nomeDoutor: "Roberta Martins",
        especialidade: "Biomédica",
        data: "2024-12-14",
        horario: "17:30",
        nome_cliente:"Rafael Mendes da Silva",
        valor: 1500
    },
    {
        id_appointment: 4,
        nome_procedimento: "Consulta",
        nomeDoutor: "Roberta Martins",
        especialidade: "Biomédica",
        data: "2024-12-14",
        horario: "17:30",
        nome_cliente:"Rafael Mendes da Silva",
        valor: 1500
    },
    {
        id_appointment: 5,
        nome_procedimento: "Consulta",
        nomeDoutor: "Roberta Martins",
        especialidade: "Biomédica",
        data: "2024-12-14",
        horario: "17:30",
        nome_cliente:"Rafael Mendes da Silva",
        valor: 1500
    },
    {
        id_appointment: 6,
        nome_procedimento: "Consulta",
        nomeDoutor: "Roberta Martins",
        especialidade: "Biomédica",
        data: "2024-12-14",
        horario: "17:30",
        nome_cliente:"Rafael Mendes da Silva",
        valor: 1500
    }
];

export const agendamentos = [
    {
        idAgendamento: 1,
        idCliente: 2,
        nome: "Peeling Químico",
        horario: "15:00",
        data: "14/12/2024",
        obsercacoes: "Cliente alérgica a toxina",
        valor: 300.00
    },
    {
        idAgendamento: 2,
        idCliente: 2,
        nome: "Peeling Químico",
        horario: "15:00",
        data: "14/12/2024",
        obsercacoes: "Cliente alérgica a toxina",
        valor: 300.00
    },
    {
        idAgendamento: 3,
        idCliente: 2,
        nome: "Peeling Químico",
        horario: "15:00",
        data: "14/12/2024",
        obsercacoes: "Cliente alérgica a toxina",
        valor: 300.00
    },
    {
        idAgendamento: 4,
        idCliente: 2,
        nome: "Peeling Químico",
        horario: "15:00",
        data: "14/12/2024",
        obsercacoes: "Cliente alérgica a toxina",
        valor: 300.00
    }
];

export const procedimento = [
    {
        idProcedimento: 1,
        nome_procedimento: "Peeling Químico",
        valor: 300.00,
        idProduto: 5,
        descricao: "O peeling químico é um tratamento que utiliza substâncias ácidas para renovar a pele, promovendo a remoção das camadas superficiais. Indicado para tratamento de manchas, acne, rugas finas e irregularidades na textura da pele."
    },
    {
        idProcedimento: 2,
        nome_procedimento: "Microagulhamento",
        valor: 250.00,
        idProduto: 4,
        descricao: "O microagulhamento consiste na utilização de um aparelho com pequenas agulhas para criar microperfurações na pele, estimulando a produção de colágeno e elastina, sendo indicado para tratamento de cicatrizes de acne, linhas finas e rejuvenescimento."
    },
    {
        idProcedimento: 3,
        nome_procedimento: "Toxina Botulínica (Botox)",
        valor: 1000.00,
        idProduto: 3,
        descricao: "A aplicação de toxina botulínica tem o objetivo de reduzir rugas e linhas de expressão, principalmente na região da testa, ao redor dos olhos e entre as sobrancelhas. É um procedimento minimamente invasivo que tem efeito temporário, de 4 a 6 meses."
    },
    {
        idProcedimento: 4,
        nome_procedimento: "Lipoaspiração a Laser",
        valor: 8000.00,
        idProduto: 2,
        descricao: "A lipoaspiração a laser utiliza tecnologia a laser para dissolver a gordura localizada, proporcionando resultados mais suaves e com recuperação mais rápida em comparação à lipoaspiração tradicional."
    },
    {
        idProcedimento: 5,
        nome_procedimento: "Preenchimento Facial com Ácido Hialurônico",
        valor: 2500.00,
        idProduto: 1,
        descricao: "O preenchimento facial com ácido hialurônico é indicado para dar volume e suavizar rugas em áreas como maçãs do rosto, sulcos nasogenianos e lábios. O ácido hialurônico hidrata e preenche a pele, promovendo um efeito mais jovem."
    }
];