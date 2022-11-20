# dsmeta

DSMeta é um projeto realizado durante a Semana Spring React, ofericida pela escola de programação DevSuperior (https://devsuperior.com.br/cursos)
com a orientação do professor Nelio Alves, cuja didática e metodologia de ensino online ficaram muito conhecidas através dos cursos de tecnologia ofertados por ele na plataforma Udemy.

A segunda edição deste evento gratuito contou com 3 aulas e ocorreu entre os dias 14 e 20 de novembro de 2022 e após este período, as aulas não estão mais acessíveis.
O projeto se encontra em produção (20/11/2022) pelo link https://dsmeta-ttp3r.netlify.app/ e foi lançado através do Heroku e do Netlify.

O objetivo era a criação de um sistema capaz de notificar via SMS. Na primeira aula, o foco era o aprendizado de como iniciar e gravar um projeto no Github através do Git,
montar um layout estático com HTML e CSS a partir do Figma (https://www.figma.com/file/PehiT8Dw4Lv5ioTSULZeRI/DSMeta3), trabalhar com componentes React: Datepicker e ReactHook.

Na segunda aula, o objetivo foi desenvolver o backend do sistema e integra-lo com o banco de dados H2 utilizando Java com Spring Boot. Os conceitos abordados foram:
entidades, banco de dados, database seed, listagem de dados, API Rest, Postman e integração com o serviço de SMS Twilio.

Na última aula foi integerado o backend com o frontend. Após testes de requisições no Postman com a biblioteca Axios e o useEffect, o projeto foi implantado na nuvem.

Ao final, o sistema é capaz de buscar dados como nome e id do vendedor, quantidade de visitas e e de vendas realizadas por ele e total de vendas em reais durante o período de tempo selecionado e enviar estas informações via SMS (para mim) por meio de clique no botão.

Todas estas etapas podem ser observadas nos commits realizados aqui no meu repositório, deixo abaixo no entanto, o passo a passo disponibilizado pela DevSuperior e com o qual trabalhamos para o desenvolvimento do projeto, que também está disponível com mais detalhes no repositório da própria DevSuperior: https://github.com/devsuperior/sds-dsmeta.

<h1> Semana Spring React - Episódio 1 </h1>

Objetivos do projeto para esta aula

    Criar projetos backend e frontend
    Salvar os projeto no Github em monorepo
    Montar o visual estático do front end


<h3> Passo: criar projeto ReactJS </h3>

yarn create vite frontend --template react-ts

    Criar projeto Spring Boot no Spring Initializr com as seguintes dependências:
        Web
        JPA
        H2
        Security

    Ajuste no arquivo pom.xml:

<plugin>
	<groupId>org.apache.maven.plugins</groupId>
	<artifactId>maven-resources-plugin</artifactId>
	<version>3.1.0</version><!--$NO-MVN-MAN-VER$ -->
</plugin>

    Botão direito no projeto -> Maven -> Update project (force update)

<h3> Passo: salvar primeira versão no Github </h3>

git init

git add .

git commit -m "Project created"

git branch -M main

git remote add origin git@github.com:seuusuario/seurepositorio.git

git push -u origin main

<h3> Passo: "limpar" o projeto ReactJS </h3>

Vamos pegar o CSS que fizemos nas aulas de preparação:

https://github.com/acenelio/dsmeta-css

    COMMIT: Project clean

<h3> Passo: Primeiro componente </h3>

Projeto HTML/CSS: https://github.com/acenelio/dsmeta-css

    COMMIT: First component

<h3> Passo: Outros componentes </h3>

    COMMIT: Other components

<h3> Passo: Datepicker </h3>

Documentação: https://github.com/Hacker0x01/react-datepicker

yarn add react-datepicker@4.8.0 @types/react-datepicker@4.4.2

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

<DatePicker
    selected={new Date()}
    onChange={(date: Date) => {}}
    className="dsmeta-form-control"
    dateFormat="dd/MM/yyyy"
/>

    COMMIT: Datepicker

<h3> Passo: React Hook useState para manter estado das datas </h3>

Macete para criar uma data de X dias atrás:

const date = new Date(new Date().setDate(new Date().getDate() - 365));

    COMMIT: useState
    
<h1> Semana Spring React - Episódio 2 </h1>

Objetivos do projeto para esta aula

    Implementar o back end
    Acesso a banco de dados
    Criar endpoints da API REST
    Integração com SMS
    Implantação na nuvem

<h3> Passo: configuração de segurança </h3>

import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		
		http.headers().frameOptions().disable();
		http.cors().and().csrf().disable();
		http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
		http.authorizeHttpRequests((auth) -> auth.anyRequest().permitAll());

		return http.build();
	}

	@Bean
	CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration configuration = new CorsConfiguration().applyPermitDefaultValues();
		configuration.setAllowedMethods(Arrays.asList("POST", "GET", "PUT", "DELETE", "OPTIONS"));
		final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);
		return source;
	}
}

    COMMIT: Security config

<h3> Passo: banco de dados </h3>

    Criar entidade Sale
    Fazer mapeamento objeto-relacional (JPA)
    Configurar dados de conexão do banco de dados H2
    Fazer seed do banco de dados

application.properties

spring.datasource.url=jdbc:h2:mem:testdb
spring.datasource.username=sa
spring.datasource.password=

spring.h2.console.enabled=true
spring.h2.console.path=/h2-console

spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true

import.sql

(*lista de dados fictícios para consulta disponibilizados pela DevSuperior no seguinte padrão*)

INSERT INTO tb_sales(seller_name,visited,deals,amount,date) VALUES ('Barry Allen',121,67,18196.0,'2022-06-16');

    COMMIT: Database

<h3> Passo: Primeiro teste de endpoint da API REST </h3>

    Criar repository

    Criar service

    Criar controller

    COMMIT: API test

<h3> Passo: Consulta por data </h3>

Consulta customizada:

@Query("SELECT obj FROM Sale obj WHERE obj.date BETWEEN :min AND :max ORDER BY obj.amount DESC")
Page<Sale> findSales(LocalDate min, LocalDate max, Pageable pageable);

    COMMIT: Date select

<h3> Passo: Envio de SMS </h3>

Dependências Maven do Twilio

<dependency>
	<groupId>com.twilio.sdk</groupId>
	<artifactId>twilio</artifactId>
	<version>8.31.1</version>
</dependency>

Variáveis de ambiente no application.properties:

twilio.sid=${TWILIO_SID}
twilio.key=${TWILIO_KEY}
twilio.phone.from=${TWILIO_PHONE_FROM}
twilio.phone.to=${TWILIO_PHONE_TO}

Classe SmsService:

@Service
public class SmsService {

	@Value("${twilio.sid}")
	private String twilioSid;

	@Value("${twilio.key}")
	private String twilioKey;

	@Value("${twilio.phone.from}")
	private String twilioPhoneFrom;

	@Value("${twilio.phone.to}")
	private String twilioPhoneTo;

	public void sendSms() {

		Twilio.init(twilioSid, twilioKey);

		PhoneNumber to = new PhoneNumber(twilioPhoneTo);
		PhoneNumber from = new PhoneNumber(twilioPhoneFrom);

		Message message = Message.creator(to, from, "Teste").create();

		System.out.println(message.getSid());
	}
}

    COMMIT: Twilio SMS

<h3> Passo: Implantação no Heroku </h3>

Arquivo system.properties

java.runtime.version=17

    Criar app no Heroku
    Definir variáveis de ambiente:
        TWILIO_SID
        TWILIO_KEY
        TWILIO_PHONE_FROM
        TWILIO_PHONE_TO
        
<h1> Semana Spring React - Episódio 3 </h1>

Objetivos do projeto para esta aula

    Integrar back end e front end
    Implantar o front end

<h3> Passo: Primeira requisição com Axios e useEffect </h3>

yarn add axios@0.27.2

    COMMIT: Axios, useEffect first request

<h3> Passo: Listagem de vendas </h3>

Definição da BASE_URL:

export const BASE_URL = import.meta.env.VITE_BACKEND_URL ?? "http://localhost:8080";

    COMMIT: Sale listing

<h3> Passo: Passando as datas como argumento </h3>

    COMMIT: Date update

<h3> Passo: Enviar notificação </h3>

    COMMIT: Send notification

<h3> Passo: Mensagem Toast de confirmação </h3>

yarn add react-toastify@9.0.5

No App.tsx:

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

    COMMIT: Toast

<h3> Passo: Deploy no Netlify </h3>

Antes: acrescente window.React = React no seu main.tsx conforme abaixo, e salve um novo commit:

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

window.React = React

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

https://www.netlify.com/

    Deploy básico
        Base directory: frontend
        Build command: yarn build
        Publish directory: frontend/dist
        Variáveis de ambiente:
            VITE_BACKEND_URL

    Configurações adicionais
        Site settings -> Domain Management: (colocar o nome que você quiser)
        Deploys -> Trigger deploy


