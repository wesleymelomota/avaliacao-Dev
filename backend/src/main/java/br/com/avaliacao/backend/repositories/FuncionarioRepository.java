package br.com.avaliacao.backend.repositories;

import org.springframework.data.repository.PagingAndSortingRepository;

import br.com.avaliacao.backend.entities.Funcionario;

public interface FuncionarioRepository extends PagingAndSortingRepository<Funcionario, Integer> {
	public Iterable<Funcionario> findByNomeContainingIgnoreCase(String parteNome);
	public Funcionario findByNomeIgnoreCase(String parteNome);
	public Funcionario findByCodigo(Integer codigo);
}
