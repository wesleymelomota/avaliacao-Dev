package br.com.avaliacao.backend.entities;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

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


@Entity
//@Table(uniqueConstraints = {@UniqueConstraint(columnNames = {"data", "funcionario", "exame"})})
public class Consultas {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer codigo;
	
	@JoinColumn(name = "funcionario_Consulta")
	@ManyToOne(fetch = FetchType.EAGER)
	private Funcionario funcionario;
	
	private LocalDate data;
	@ManyToOne(fetch = FetchType.EAGER)
	private Exame exame;
	
	public Consultas(Funcionario funcionario, Exame exame, LocalDate data) {
		this.setFuncionario(funcionario); 
		this.exame = exame;
		this.data = data;
	}
	
	public Consultas () {}

	public Integer getCodigo() {
		return codigo;
	}

	public void setCodigo(Integer codigo) {
		this.codigo = codigo;
	}

	public Funcionario getFuncionario() {
		return funcionario;
	}

	public void setFuncionario(Funcionario funcionario) {
		this.funcionario = funcionario;
	}

	public LocalDate getData() {
		return data;
	}

	public void setData(LocalDate data) {
		this.data = data;
	}

	public Exame getExame() {
		return exame;
	}

	public void setExame(Exame exame) {
		this.exame = exame;
	}

	@Override
	public int hashCode() {
		return Objects.hash(data, exame, funcionario);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Consultas other = (Consultas) obj;
		return Objects.equals(data, other.data) && Objects.equals(exame, other.exame)
				&& Objects.equals(funcionario, other.funcionario);
	}

	

	/*public List<Exame> getExame() {
		return exame;
	}

	public void setExame(List<Exame> exame) {
		this.exame = exame;
	}*/

	
	
}
