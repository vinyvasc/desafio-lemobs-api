export class Helper {

    static formatCPF(cpf: string):string {
        let cpfArr =  cpf.split("");
        cpfArr.splice(3, 0, ".");
        cpfArr.splice(7, 0,".");
        cpfArr.splice(11, 0 , "-");
        console.log(cpfArr)
      
        const formatted_cpf = cpfArr.join('');
        return formatted_cpf;
    }

    static formatEndereco(aluno: object): object[]{
        let enderecos = aluno[0].enderecos;
        let formatted_enderecos = enderecos.map( item => {
            let comp = (item.complemento)? ' - ' +  item.complemento: '';
            let ret =  {
                endereco: item.rua + ", "+ item.numero + comp,
                bairro: item.bairro
            }
            return ret;
        });
       return formatted_enderecos;
    }

    static validaCPF(cpf: string) :boolean {
        let soma: number;
        let resto: number;
        soma = 0;
      if (cpf == "00000000000") return false;
    
      for (let i=1; i<=9; i++) soma = soma + parseInt(cpf.substring(i-1, i)) * (11 - i);
      resto = (soma * 10) % 11;
    
        if ((resto == 10) || (resto == 11))  resto = 0;
        if (resto != parseInt(cpf.substring(9, 10)) ) return false;
    
      soma = 0;
        for (let i = 1; i <= 10; i++) soma = soma + parseInt(cpf.substring(i-1, i)) * (12 - i);
        resto = (soma * 10) % 11;
    
        if ((resto == 10) || (resto == 11))  resto = 0;
        if (resto != parseInt(cpf.substring(10, 11) ) ) return false;
        return true;
    }
}

