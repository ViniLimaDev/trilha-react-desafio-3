import {Container, Column, Wrapper, TitleLogin, SubtitleLogin, Title, DescriptionTitle, CriarText } from "./styles"
import { Header } from '../../components/Header'
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { api } from "../../services/api"
import { MdEmail, MdLock, MdPerson} from 'react-icons/md'

const Signin = () => {

    const navigate = useNavigate()

    const goToLogIn = () => {
        navigate('/login');
      }

    const { control, handleSubmit, formState: { errors  } } = useForm({
        reValidateMode: 'onChange',
        mode: 'onChange',
    });

    const onSubmit = async (formData) => {
        try{
            await api.post(`/users`, {
                name: formData.nome,
                email: formData.email,
                senha: formData.senha
            });

            alert('Usuário cadastrado com sucesso');
        }catch(e){
            //TODO: HOUVE UM ERRO
        }
    };

    console.log('errors', errors);

  return(<>
    <Header />
    <Container>
        <Column>
            <Title>
            A plataforma para você aprender com experts, dominar as principais tecnologias e entrar mais rápido nas empresas mais desejadas.
            </Title>
        </Column>
        <Column>
            <Wrapper>
                    <TitleLogin>Faça seu cadastro</TitleLogin>
                    <SubtitleLogin>Faça seu cadastro e make the change._</SubtitleLogin>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Input placeholder="Nome completo" leftIcon={<MdPerson />} control={control} name="nome"/>
                        {errors.name && <span>Nome é obrigatório</span>}
                        <Input placeholder="E-mail" leftIcon={<MdEmail />} name="email"  control={control} />
                        {errors.email && <span>E-mail é obrigatório</span>}
                        <Input type="password" placeholder="Senha" leftIcon={<MdLock />}  name="senha" control={control} />
                        {errors.senha && <span>Senha é obrigatório</span>}
                        <Button title="Cadastrar" variant="secondary" type="submit"/>
                    </form>
                        <DescriptionTitle>
                            Ao clicar em "Cadastrar", declaro que aceito as Políticas de Privacidade e os Termos de Uso da DIO.
                        </DescriptionTitle>
                        <CriarText onClick={goToLogIn}>
                            Já tenho conta. Fazer Login
                        </CriarText>
            </Wrapper>
        </Column>
    </Container>
    </>
  )
}

export { Signin };