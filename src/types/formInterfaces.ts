interface IUsuario {
    id?: number;
    nome: string;
    sobrenome: string;
    login: string;
    password: string;
    cep: string;
    endereco: string;
    complemento: string;
    cidade: string;
    estado: string;
    tel: string;
    cel: string;
    ativo: boolean;
    data_nasc: Date;
    rg: string;
    cpf: string;
    tamanho_camisa: string;
    nivel: number;
    qr_code: string;
    foto_perfil: string;
    remember_token: string;

    unidade_id?: number;
    unidade: IUnidade;
}

interface IUnidade {
    id?: number;
    nome: string;
    equipamentos: string;
}

interface IPontoUnidade {
    id?: number;
    pontos: number;
    descricao: string;
    data_pontos: Date;
    unidade_id: number;
}

interface IPontoIndividual {
    id?: number;
    descricao: string;
    pontos: number;
    data_pontos: Date;
    usuario_id: number;
}

interface IEventos {
    id?: number;
    titulo: string;
    descricao: string;
    data_evento: Date;
    ponto_evento: number;
    pontos_adicionados: boolean;
}

interface IDesbravadorEvento {
    id?: number;
    usuario_id: number;
    usuario?: IUsuario;
    evento_id: number;
    evento?: IEventos;
}

export {
    IUsuario,
    IUnidade,
    IPontoUnidade,
    IPontoIndividual,
    IEventos,
    IDesbravadorEvento
};