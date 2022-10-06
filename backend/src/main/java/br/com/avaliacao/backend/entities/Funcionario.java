package br.com.avaliacao.backend.entities;

import java.util.ArrayList;
import java.util.List;
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

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(uniqueConstraints = {@UniqueConstraint(columnNames = {"nome"})})
public class Funcionario {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer codigo;
	
	private String nome;
	
	//@JsonIgnore
	//@OneToMany(mappedBy = "funcionario",orphanRemoval = true, cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	//private List<Exame> exames = new ArrayList<>();
	@JsonIgnore
	@OneToMany(mappedBy = "funcionario",orphanRemoval = true, cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	private List<Consultas> consultas = new ArrayList<>();
	
	public Funcionario() {}
	
	public Funcionario(String nome) {
		super();
		this.nome = nome;
	}
	public Funcionario(String nome, Integer codigo) {
		super();
		this.nome = nome;
		this.codigo = codigo;
	}
	

	/*public List<Exame> getExames() {
		return exames;
	}

	public void setExames(List<Exame> exames) {
		this.exames = exames;
	}*/

	public Integer getCodigo() {
		return codigo;
	}

	public void setCodigo(Integer codigo) {
		this.codigo = codigo;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	@Override
	public int hashCode() {
		return Objects.hash(nome);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Funcionario other = (Funcionario) obj;
		return Objects.equals(nome, other.nome);
	}

	
	/*@Override
	public int hashCode() {
		return Objects.hash(codigo, exames, nome);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Funcionario other = (Funcionario) obj;
		return Objects.equals(codigo, other.codigo) && Objects.equals(exames, other.exames)
				&& Objects.equals(nome, other.nome);
	}*/
	
	
}
