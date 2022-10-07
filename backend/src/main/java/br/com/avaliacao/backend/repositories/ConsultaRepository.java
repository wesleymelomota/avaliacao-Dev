package br.com.avaliacao.backend.repositories;

import java.time.LocalDate;
import java.util.Date;

import org.springframework.data.repository.PagingAndSortingRepository;

import br.com.avaliacao.backend.entities.Consultas;
import br.com.avaliacao.backend.entities.Funcionario;

public interface ConsultaRepository extends PagingAndSortingRepository<Consultas, Integer>{
	public Consultas findByFuncionarioCodigo(Integer codigo);
	public Consultas findByFuncionario(Funcionario funcionario);
	public Consultas findByExameCodigo(Integer codigo);
	public Consultas findByData(LocalDate data);
	public Consultas findByFuncionario(String nome);
	public Consultas findByExame(String exameNome);
	
}
