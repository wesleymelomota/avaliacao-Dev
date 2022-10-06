package br.com.avaliacao.backend.entities;

import java.text.DateFormat;
import java.time.LocalDate;
import java.util.Calendar;
import java.util.Date;
import java.util.Locale;
import java.util.Objects;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import org.hibernate.mapping.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
//@Table(uniqueConstraints = {@UniqueConstraint(columnNames = {"nomeExame", "data"})})
public class Exame {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer codigo;
	
	private String nomeExame;
	
	//@JsonIgnore //sem essa anotação não é possivel listar a lista. ocorre um erro no postman
	//@OneToMany(mappedBy = "exame", orphanRemoval = true, cascade = CascadeType.ALL, fetch = FetchType.EAGER )
	//private java.util.List<Consultas> consulta;
	
	//private LocalDate data;

	
	/*@JoinColumn(name = "funcionario_codigo")
	@ManyToOne(fetch = FetchType.EAGER)
	private Funcionario funcionario;*/

	/*public Exame(String nomeExame, Funcionario funcionario, LocalDate data) {
		super();
		this.setNomeExame(nomeExame);
		this.setFuncionario(funcionario);
		this.setData(data);
	}
	
	public Exame(Integer codigo, String nomeExame, Funcionario funcionario, LocalDate data) {
		super();
		this.codigo = codigo;
		this.setNomeExame(nomeExame);
		this.setFuncionario(funcionario);
		//this.setData(data);
		this.setData(data);
	}*/
	
	public Exame(String nomeExame) {
		this.nomeExame = nomeExame;
		
	}
	//para update
	public Exame(String nomeExame, Integer codigo) {
		this.nomeExame = nomeExame;
		this.codigo = codigo;
		
	}
	
	public Exame() {
	
	}


	/*public Funcionario getFuncionario() {
		return funcionario;
	}*/

	/*public LocalDate getData() {
		return data;
	}

	public void setData(LocalDate data) {
		this.data = data;
	}*/

	/*public void setFuncionario(Funcionario funcionario) {
		this.funcionario = funcionario;
	}*/

	

	public Integer getCodigo() {
		return codigo;
	}

	/*public java.util.List<Consultas> getConsulta() {
		return consulta;
	}

	public void setConsulta(java.util.List<Consultas> consulta) {
		this.consulta = consulta;
	}*/

	public void setCodigo(Integer codigo) {
		this.codigo = codigo;
	}

	public String getNomeExame() {
		return nomeExame;
	}

	public void setNomeExame(String nomeExame) {
		this.nomeExame = nomeExame;
	}
	@Override
	public int hashCode() {
		return Objects.hash(nomeExame);
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Exame other = (Exame) obj;
		return Objects.equals(nomeExame, other.nomeExame);
	}
	

	/*@Override
	public int hashCode() {
		return Objects.hash(data, funcionario, nomeExame);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Exame other = (Exame) obj;
		return Objects.equals(data, other.data) && Objects.equals(funcionario, other.funcionario)
				&& Objects.equals(nomeExame, other.nomeExame);
	}*/


	
		
}
